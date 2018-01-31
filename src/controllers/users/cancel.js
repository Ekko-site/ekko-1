import services from './../../services'
const { Users, Stripe, FacebookToken, Pages, Domains, DirectDebit } = services
import Facebook from './../../etc/facebook'

import ApiError from './../../etc/error'

const cancel = async ({ user }) => {
    const users = new Users()
    const stripe = new Stripe()
    const facebookTokens = new FacebookToken()
    const pages = new Pages()
    const facebook = new Facebook()
    const directDebit = new DirectDebit()
    await stripe.deleteCustomer(user.id)
    await directDebit.cancelSubscription(user.id)
    await facebookTokens.removeByUserId(user.id)
    const userPages = await pages.getByUserId(user.id)
    if(userPages.length){
        const domains = new Domains()
        const userPage = userPages[0]
        await domains.removeByPageId(userPage.id)
        await facebook.unsubscribeFromPage(userPage)
    }
    await pages.removeByUserId(user.id)
    await users.remove(user.id)
    return { }
}

export default cancel
