import got from 'got'
const cc = require('currency-converter')({ CLIENTKEY: process.env.OPEN_EXCHANGE_RATES })
import moment from 'moment'

import plans from './../../../config/direct-debit-plans'
import Coupons from '@/services/coupons'
import DirectDebitSubscriptions from '@/services/directdebitsubscriptions'
import { DirectDebitCustomerId, DirectDebitSubscriptionId } from '@/models'
import { logger } from '@/etc/logger'
import ApiError from '@/etc/error'

const getConvertedDomainCost = async domainCost => await cc.convert(domainCost, 'USD', 'GBP')

const BASE_URL = process.env.GC_BASE_URL
const TOKEN = process.env.GC_TOKEN
const REDIRECT_URL = process.env.GC_REDIRECT_URL

const gcRequest = async (endpoint, opts) => {
    let response,
        url = `${BASE_URL}${endpoint}`
    try {
        response = await got(url, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'GoCardless-Version': '2015-07-06',
                'Content-Type': 'application/json'
            },
            json: true,
            ...opts
        })
    } catch (error) {
        logger.error(error.response.body)
        return {
            error: error.response.body
        }
    }
    return response.body
}

class DirectDebit {
    constructor(db) {
        this.db = db || DirectDebitCustomerId
    }
    async createRedirectFlow(user) {
        const response = await gcRequest('redirect_flows', {
            body: JSON.stringify({
                "redirect_flows": {
                    "description": "Ekko",
                    "session_token": user.id.toString(),
                    "success_redirect_url": REDIRECT_URL,
                    "prefilled_customer": {
                        "given_name": user.firstName,
                        "family_name": user.lastName,
                        "email": user.email
                    }
                }
            })
        })
        if (response.error) {
            return {}
        }
        await this.saveRedirectId(user, response.redirect_flows.id, response.redirect_flows.redirect_url)
        return {
            url: response.redirect_flows.redirect_url
        }
    }

    async saveRedirectId(user, redirectId, redirectUrl) {
        await this.db.create({
            redirectId,
            UserId: user.id,
            sessionToken: user.id.toString(),
            redirectUrl
        })
    }

    async saveNewCustomer(user, details) {
        await this.db.update(details, {
            where: {
                UserId: user.id
            }
        })
    }

    async getByMandateId(mandateId) {
        return await this.db.findOne({
            mandateId
        })
    }

    async getByUserId(UserId) {
        return await this.db.findOne({ UserId })
    }

    async addPaymentToCustomer(UserId, cost) {
        const record = await this.getByUserId(UserId)
        if (record) {
            let convertedDomainCost = await getConvertedDomainCost(cost)
            const amount = parseInt(convertedDomainCost.amount * 100, 10)
            const response = await gcRequest('payments', {
                body: JSON.stringify({
                    "payments": {
                        amount,
                        "currency": "GBP",
                        "links": {
                            "mandate": record.mandateId
                        }
                    }
                })
            })
            if (response.error) {
                return {}
            }
            logger.info('created charge for user', UserId, response)
            return response
        }
    }

    async activateByMandateId(mandateId) {
        await this.db.update({
            active: true
        }, {
                where: {
                    mandateId
                }
            })
        return await this.getByMandateId(mandateId)
    }

    async suspendByMandateId(mandateId) {
        await this.db.update({
            active: false
        }, {
                where: {
                    mandateId
                }
            })
        return await this.getByMandateId(mandateId)
    }

    async cancelSubscription(UserId) {
        const record = await this.db.findOne({
            UserId
        })
        if (!record) {
            return
        }
        const response = await gcRequest(`mandates/${record.mandateId}/actions/cancel`)
        record.active = false
        return await record.save()
    }

    async fetchPayment(paymentId) {
        const response = await gcRequest(`payments/${paymentId}`)
        if (response.error) {
            return null
        }
        return response.payments
    }

    async subscribeCustomerToPlan(user, mandateId) {
        const directDebitRecord = await this.db.findOne({
            where: {
                UserId: user.id
            }
        })
        const directDebitSubscriptions = new DirectDebitSubscriptions()
        const plan = plans.filter(p => p.id == 'pro-standard')[0]
        const coupon = user.coupon
        let useCoupon
        if (coupon) {
            const coupons = new Coupons()
            const validCoupon = await coupons.getByCode(coupon)
            if (validCoupon) {
                useCoupon = validCoupon
            }
        }
        const fullPriceSub = {
            "amount": plan.cost.toString(),
            "currency": "GBP",
            "interval_unit": "monthly",
            "links": {
                "mandate": mandateId
            }
        }
        if (useCoupon && useCoupon.discount < 100) {
            let discountedAmount = parseInt(plan.cost - (plan.cost * (useCoupon.discount / 100)), 10)
            let discountedSub = {
                "amount": discountedAmount.toString(),
                "count": useCoupon.months,
                "currency": "GBP",
                "interval_unit": "monthly",
                "links": {
                    "mandate": mandateId
                }
            }
            const discountedResponse = await gcRequest('subscriptions', {
                body: JSON.stringify({
                    "subscriptions": discountedSub
                })
            })
            if (discountedResponse.error) {
                return {}
            }
            await directDebitSubscriptions.addSubscription({
                subscriptionId: discountedResponse.subscriptions.id,
                upcomingPayments: discountedResponse.subscriptions.upcoming_payments,
                DirectDebitCustomerIdId: directDebitRecord.id
            })
            const newDate = moment(discountedResponse.subscriptions.end_date).add(1, 'month').format('YYYY-MM-DD')
            fullPriceSub.start_date = newDate
        } else if(useCoupon && useCoupon.discount == 100) {
            const newDate = moment().add(useCoupon.months, 'month').format('YYYY-MM-DD')
            fullPriceSub.start_date = newDate
        }
        const fullPriceResponse = await gcRequest('subscriptions', {
            body: JSON.stringify({
                "subscriptions": fullPriceSub
            })
        })
        if (fullPriceResponse.error) {
            return {}
        }
        logger.info('New Direct Debit subscription', fullPriceResponse.subscriptions)
        await directDebitSubscriptions.addSubscription({
            subscriptionId: fullPriceResponse.subscriptions.id,
            upcomingPayments: fullPriceResponse.subscriptions.upcoming_payments,
            DirectDebitCustomerIdId: directDebitRecord.id
        })
        directDebitRecord.active = true
        await directDebitRecord.save()
        return {}
    }

    async completeRedirectFlow(user) {
        const directDebitCustomerId = await this.db.findOne({
            UserId: user.id
        })
        const redirectId = directDebitCustomerId.get('redirectId')
        const response = await gcRequest(`redirect_flows/${redirectId}/actions/complete`, {
            body: JSON.stringify({
                "data": {
                    "session_token": user.id.toString()
                }
            })
        })
        if (response.error) {
            return {}
        }
        const { links } = response.redirect_flows
        await this.saveNewCustomer(user, {
            customerId: links.customer,
            mandateId: links.mandate,
            customerBankAccountId: links.customer_bank_account
        })
        await this.subscribeCustomerToPlan(user, links.mandate)
        return {}
    }
}

export default DirectDebit
