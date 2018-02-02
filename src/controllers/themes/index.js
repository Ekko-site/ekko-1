import get from '@/controllers/themes/get'

export default {
    '/api/themes/': get.all,
    '/api/themes/:id': get.one
}
