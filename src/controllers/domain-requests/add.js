import { DomainRequests, Domains } from '@/services'
import { logger } from '@/etc/logger'

const add = async ({ registrar, DomainId, user  }) => {
    const domainRequests = new DomainRequests()
    const domains = new Domains()
    const domainRequest = await domainRequests.add(registrar, DomainId)
    await domains.dnsRequested(DomainId)
    const userDomains = await domains.getById(DomainId)

    return {
        domains: [userDomains]
    }
}

export default add
