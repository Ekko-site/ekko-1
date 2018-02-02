import { Domains, Heroku, Pages } from '@/services'

import DNSimpleTLDs from './../../../config/dnsimple-tlds'

const cc = require('currency-converter')({ CLIENTKEY: process.env.OPEN_EXCHANGE_RATES })

const get = {
    async search({ search, page_id }) {
        let domain = search
        const domains = new Domains()
        const existing = await domains.getByDomain(domain)
        if(existing && existing.get('PageId') !== page_id){
            return {
                searches: {
                    domain,
                    available: false
                }
            }
        }
        const searches = await domains.search(domain)
        return {
            searches
        }
    },
    async byUserPages({ user }) {
        let pages = new Pages()
        const domains = new Domains()
        let userId = user.id
        const userPages = await pages.getByUserId(userId)
        const userDomains = await domains.getByPageIds(userPages.map(page => page.get('id')))
        return {
            domains: userDomains
        }
    },
    async tlds() {
        const tlds = await Promise.all(Object.keys(DNSimpleTLDs).map(async (tldKey) => {
            let tld = DNSimpleTLDs[tldKey]
            const converted = await cc.convert(tld.cost, 'USD', 'GBP')
            return {
                name: tldKey,
                cost: converted.amount
            }
        }))
        return {
            tlds
        }
    }
}

export default get
