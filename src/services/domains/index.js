import moment from 'moment'

import { Domain } from '@/models'
import { logger } from '@/etc/logger'
import ApiError from '@/etc/error'

const client = require('dnsimple')({
  baseUrl: process.env.NODE_ENV == 'production' ? 'https://api.dnsimple.com' : 'https://api.sandbox.dnsimple.com',
  accessToken: process.env.DNSIMPLE_TOKEN
})

class Domains {
    constructor(db) {
        this.db = db || Domain
    }

    async getById(id) {
        return await this.db.findOne({
            where: {
                id
            }
        })
    }

    async removeByUserId(userId) {
        return await this.db.destroy({
            where: {

            }
        })
    }

    async search(query) {
        let results
        try {
            logger.info('Searching domain', query)
            results = await client.registrar.checkDomain(process.env.DNSIMPLE_ACCOUNT, query)
        } catch (e) {
            throw new ApiError(400, e)
        }
        logger.info('Searched domains', results)
        return results.data
    }

    async createDomain(domain) {
        let newDomain
        try {
            logger.info('Creating domain', domain)
            newDomain = await client.domains.createDomain(process.env.DNSIMPLE_ACCOUNT, {
                name: domain
            })
        } catch (e) {
            throw new ApiError(400, e)
        }
        logger.info('Created domain', newDomain)
        return newDomain.data
    }

    async registerDomain(domain, registrant_id) {
        let registeredDomain
        domain = domain.toLowerCase()
        try {
            logger.info('Registering domain', domain, registrant_id)
            registeredDomain = await client.registrar.registerDomain(process.env.DNSIMPLE_ACCOUNT, domain, {
                registrant_id,
                whois_privacy: true
            })
        } catch (e) {
            throw new ApiError(400, e)
        }
        logger.info('Registered domain', registeredDomain.data)
        return registeredDomain.data
    }

    async addContact(contact) {
        let newContact
        try {
            logger.info('Adding contact with account id', process.env.DNSIMPLE_ACCOUNT, contact)
            newContact = await client.contacts.createContact(process.env.DNSIMPLE_ACCOUNT, contact)
        } catch (e) {
            console.error(e)
            throw new ApiError(400, e)
        }
        logger.info('Added contact', newContact)
        return newContact.data.id
    }

    async applyTemplateToDomain(domain) {
        let appliedTemplate
        try {
            logger.info('Applying template to', domain, process.env.DNSIMPLE_ACCOUNT, process.env.DNSIMPLE_TEMPLATE_NAME)
            appliedTemplate = await client.templates.applyTemplate(process.env.DNSIMPLE_ACCOUNT, process.env.DNSIMPLE_TEMPLATE_NAME, domain)
        } catch (e) {
            console.error(e)
            throw new ApiError(400, e)
        }
        logger.info('Applied template to', domain, process.env.DNSIMPLE_ACCOUNT, process.env.DNSIMPLE_TEMPLATE_NAME, appliedTemplate)
        const applied = await this.db.update({
            applied_template: true
        }, {
            where: {
                domain
            }
        })
        return await this.getByDomain(domain)
    }

    async addDomainWithPage(domain, PageId, period, domainId, registrantId) {
        const found = await this.db.findOne({
            where: {
                domain
            }
        })
        const expiresOn = moment().add(period, 'years').format('YYYY-MM-DD')
        if(found){
            logger.info('Updating domain with page', PageId, period, domainId, registrantId)
            const update = await this.db.update({
                PageId,
                expiresOn,
                domainId,
                registrantId,
                registration_in_progress: false
            }, {
                where: {
                    domain
                }
            })
            return await this.getByDomain(domain)
        }
        logger.info('Creating domain with page', domain, PageId, period, domainId, registrantId)
        const newDomain = await this.db.create({
            domain,
            PageId,
            expiresOn,
            domainId,
            registrantId,
            registration_in_progress: false
        })
        return newDomain
    }

    async getByDomain(domain) {
        return await this.db.findOne({
            where: {
                domain
            }
        })
    }

    async addDomain(domain, PageId, shouldRegister) {
        const existing = await this.getByDomain(domain)
        if(existing && PageId !== existing.get('PageId')){
            throw new ApiError(400, 'Domain already exists')
        }
        if(existing && PageId === existing.get('PageId')){
            return existing
        }
        const newDomain = await this.db.create({
            domain,
            PageId,
            registration_in_progress: shouldRegister
        })
        return newDomain
    }

    async getByPageIds(pageIds) {
        const domains = await this.db.findAll({
            where: {
                PageId: pageIds
            }
        })
        return domains
    }

    async removeByPageId(pageId) {
        return await this.db.destroy({
            where: {
                PageId: pageId
            }
        })
    }

    async getByPageId(pageId) {
        const domain = await this.db.findOne({
            where: {
                PageId: pageId
            }
        })
        return domain ? domain.get({
            plain: true
        }) : null
    }

    async getByDomainId(domainId) {
        const domain = await this.db.findOne({
            where: {
                domainId
            }
        })
        return domain ? domain.get({
            plain: true
        }) : null
    }

    async addedToHeroku(id) {
        return await this.db.update({
            added_to_heroku: true
        }, {
            where: {
                id
            }
        })
    }

    async dnsRequested(id) {
        return await this.db.update({
            dns_requested: true
        }, {
            where: {
                id
            }
        })
    }
}

export default Domains
