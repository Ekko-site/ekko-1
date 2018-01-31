import get from './get'

export default {
    '/api/tracks/all': get.allForUser,
    '/api/tracks/:id': get.one
}
