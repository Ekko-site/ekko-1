import get from '@/controllers/facebook/get'
import post from '@/controllers/facebook/post'

export default {
    '/api/facebook/page_hook': {
        get,
        post
    }
}
