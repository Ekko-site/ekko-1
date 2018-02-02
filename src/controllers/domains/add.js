import parseDomain from 'parse-domain'

import { Domains, Heroku, Pages, Stripe, DomainRequests, DirectDebit } from '@/services'

import ApiError from '@/etc/error'

import { logger } from '@/etc/logger'

import DNSimpleTLDs from './../../../config/dnsimple-tlds'
import mail from '@/etc/mail'
import Slack from '@/etc/slack'

const cc = require('currency-converter')({ CLIENTKEY: process.env.OPEN_EXCHANGE_RATES })

const defaultContact = {
    first_name: 'ben',
    last_name: 'howdle',
    address1: '26 woodend',
    city: 'evesham',
    state_province: 'WO',
    postal_code: 'wr111xl',
    country: 'GB',
    email: 'hello@ekko.site',
    phone: '+447557453018',
}

const add = {
    async addDomain({ page_id, contact = defaultContact, user, domain: domainName, shouldRegister, registrar }) {
        const domains = new Domains()
        const heroku = new Heroku()
        const stripeService = new Stripe()
        const pages = new Pages()
        const domainRequests = new DomainRequests()
        const directDebit = new DirectDebit()
        let needsCharge

        domainName = domainName.toLowerCase().trim()

        contact.label = user.id

        let domainTLD = domainName ? parseDomain(domainName).tld : null,
            PageId = page_id

        const domain = DNSimpleTLDs[domainTLD]
        const domainCost = domain ? domain.cost : 0

        const existingDomain = await domains.getByDomain(domainName)

        if(existingDomain && existingDomain.PageId !== PageId){
            throw new ApiError(400, 'Domain name already exists in Ekko')
        }

        const existingPageWithDomain = await domains.getByPageId(PageId)

        if(existingPageWithDomain && existingPageWithDomain.domain !== domainName){
            throw new ApiError(400, 'That page already has a domain name assigned')
        }

        // Pre-save domain
        const preDomainSave = await domains.addDomain(domainName, PageId, shouldRegister)

        if(shouldRegister) {
            // Add registrar to DNSimple
            const newContact = await domains.addContact(contact)

            // Register domain with DNSimple
            const registeredDomain = await domains.registerDomain(domainName, newContact)

            // Add domain to Page
            const addedDomain = await domains.addDomainWithPage(domainName, PageId, registeredDomain.period, registeredDomain.id, newContact)

            if(domainCost > 14){
                // Charge customer for domain registration
                let chargedForDomain
                if(user.StripeCustomerId) {
                    chargedForDomain = await stripeService.addChargeToCustomer(user.StripeCustomerId.customerId, domainCost)
                } else if (user.DirectDebitCustomerId) {
                    chargedForDomain = await directDebit.addPaymentToCustomer(user.id, domainCost)
                }
            }

            const applied = await domains.applyTemplateToDomain(domainName)
        } else {
            const domainRequest = await domainRequests.add(preDomainSave.id, user, registrar)
        }

        let addedDomainToHeroku
        try {
            // Add domain to Heroku app
            addedDomainToHeroku = await heroku.addDomain(domainName)
        } catch (error) {
            logger.error(error)
        }

        if(addedDomainToHeroku && addedDomainToHeroku.hostname && addedDomainToHeroku.hostname == domainName){
            await domains.addedToHeroku(preDomainSave.id)
        }

        const userPages = await pages.getByUserId(user.id)
        const userDomains = await domains.getByPageIds(userPages.map(page => page.get('id')))

        mail.send({
            to: user.email,
            type: 'newDomain',
            data: {
                shouldRegister,
                domain: domainName,
                charge: needsCharge ? domainCost : false
            }
        })

        Slack.newDomainAdded({
            registered: shouldRegister,
            domainName,
            userId: user.id
        })

        return {
            domains: userDomains
        }

    }
}

export default add
