import get from './get'
import add from './add'
import contact from './contact'

export default {
    '/api/domains/search': get.search,
    '/api/domains/contact': contact.add,
    '/api/domains/tlds': get.tlds,
    '/api/domains/page': get.byUserPages,
    '/api/domains/user': add.addDomain
}
