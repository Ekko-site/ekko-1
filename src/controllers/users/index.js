import get from './get'
import signUp from './sign-up'
import login from './login'
import remove from './remove'
import stripe from './stripe'
import facebook from './facebook'
import update from './update'
import cancel from './cancel'

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
