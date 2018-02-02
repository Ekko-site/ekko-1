import signUp from '@/etc/emails/sign-up'
import failedFBFetch from '@/etc/emails/failed-fetch'
import pagePicked from '@/etc/emails/page-picked'
import newDomainRequest from '@/etc/emails/new-domain-request'
import newDomain from '@/etc/emails/new-domain'
import userUpgrade from '@/etc/emails/user-upgrade'
import forgotPassword from '@/etc/emails/forgot-password'
import stripeInvoice from '@/etc/emails/stripe-invoice'
import directDebitPaid from '@/etc/emails/direct-debit-paid'
import directDebitSuspension from '@/etc/emails/direct-debit-suspension'

export default {
    signUp,
    failedFBFetch,
    pagePicked,
    newDomainRequest,
    newDomain,
    userUpgrade,
    forgotPassword,
    stripeInvoice,
    directDebitPaid,
    directDebitSuspension
}
