import Domains from '@/services/domains'
import { DomainRequest } from '@/models'
import mail from '@/etc/mail'

class DomainRequests {
    constructor(db) {
        this.db = db || DomainRequest
    }
    async add(DomainId, user, registrar) {
        const added = await this.db.create({
            DomainId,
            registrar
        })
        const domains = new Domains()
        await domains.dnsRequested(DomainId)
        mail.send({
            to: 'hello@ekko.site',
            type: 'newDomainRequest',
            data: {
                userEmail: user.email,
                domain: DomainId
            }
        })
        return added
    }
}

export default DomainRequests
