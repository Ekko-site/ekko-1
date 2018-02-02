import get from '@/controllers/tracks/get'

export default {
    '/api/tracks/all': get.allForUser,
    '/api/tracks/:id': get.one
}
