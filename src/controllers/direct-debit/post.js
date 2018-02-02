import moment from 'moment'
import HmacSHA256 from 'crypto-js/hmac-sha256'
import { DirectDebit, Users } from '@/services'
import Slack from '@/etc/slack'
import mail from '@/etc/mail'

const TOKEN = process.env.GC_WEBHOOK_SECRET

const post = async (args) => {
    const providedSignature = args.req.headers['webhook-signature']
    const calculatedSignature = HmacSHA256(JSON.stringify(args.req.body), TOKEN).toString()
    if (providedSignature == calculatedSignature) {
        const directDebit = new DirectDebit()
        const users = new Users()

        const notifyUserOfSuspension = user => {
            mail.send({
                to: user.email,
                type: 'directDebitSuspension'
            })
        }

        const notifyUserOfPaymentPaid = (user, payment) => {
            mail.send({
                to: user.email,
                type: 'directDebitPaid',
                data: {
                    total: payment.amount / 100,
                    date: payment.charge_date
                }
            })
        }

        const { events } = args
        for (let event of events) {
            if (['cancelled', 'failed'].indexOf(event.action) > -1) {
                if (event.resource_type == 'payments') {
                    const paymentId = event.links.payment
                    const payment = await directDebit.fetchPayment(paymentId)
                    if (!payment) {
                        return
                    }
                    const directDebitRecord = await directDebit.suspendByMandateId(payment.links.mandate)
                    if(!directDebitRecord) {
                        return
                    }
                    const user = users.getById(directDebitRecord.UserId)
                    notifyUserOfSuspension(user)
                } else if (event.resource_type == 'mandates') {
                    const mandateId = event.links.mandate
                    const directDebitRecord = await directDebit.suspendByMandateId(mandateId)
                    if(!directDebitRecord) {
                        return
                    }
                    const user = users.getById(directDebitRecord.UserId)
                    notifyUserOfSuspension(user)
                }
            } else if (event.action == 'confirmed' && event.resource_type == 'payments') {
                const paymentId = event.links.payment
                const payment = await directDebit.fetchPayment(paymentId)
                if (!payment) {
                    return
                }
                const directDebitRecord = await directDebit.getByMandateId(payment.links.mandate)
                const user = users.getById(directDebitRecord.UserId)
                notifyUserOfPaymentPaid(user, payment)
            }
        }
    }
    return {}
}

export default post
