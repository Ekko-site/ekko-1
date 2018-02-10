import initiate from '@/controllers/direct-debit/initiate'
import complete from '@/controllers/direct-debit/complete'
import post from '@/controllers/direct-debit/post'

export default {
    '/api/directdebit/initiate': initiate,
    '/api/directdebit/complete': complete,
    '/api/directdebit/webhook': post
}
