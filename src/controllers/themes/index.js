import get from './get'

export default {
    '/api/themes/': get.all,
    '/api/themes/:id': get.one
}
