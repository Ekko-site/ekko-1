import get from '@/controllers/domains/get'
import add from '@/controllers/domains/add'
import contact from '@/controllers/domains/contact'

export default {
    '/api/domains/search': get.search,
    '/api/domains/contact': contact.add,
    '/api/domains/tlds': get.tlds,
    '/api/domains/page': get.byUserPages,
    '/api/domains/user': add.addDomain
}
