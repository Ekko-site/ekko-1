import get from '@/controllers/users/get'
import signUp from '@/controllers/users/sign-up'
import login from '@/controllers/users/login'
import remove from '@/controllers/users/remove'
import stripe from '@/controllers/users/stripe'
import facebook from '@/controllers/users/facebook'
import update from '@/controllers/users/update'
import cancel from '@/controllers/users/cancel'

export default {
    '/api/users/sign-up': signUp,
    '/api/users/login': login,
    '/api/users/upgrade': stripe.upgrade,
    '/api/users/facebook/page': facebook.page,
    '/api/users/facebook/connect': facebook.connect,
    '/api/users/password': update.password,
    '/api/users/cancel': cancel,
    '/api/users/change-password': update.changePassword,
    '/api/users/request-password-reset': update.requestPasswordReset,
    '/api/users/card-update': stripe.cardUpdate,
    '/api/users/:facebook_id': get.getByFacebookId
}
