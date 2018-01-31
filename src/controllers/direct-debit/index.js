import initiate from './initiate'
import complete from './complete'
import post from './post'

export default {
    '/api/directdebit/initiate': initiate,
    '/api/directdebit/complete': complete,
    '/directdebit/webhook': post
}
