import { DirectDebit, Users } from '@/services'
import Slack from '@/etc/slack'
import mail from '@/etc/mail'

const initiate = async ({ user }) => {
    const directDebit = new DirectDebit()
    const users = new Users()
    const flow = await directDebit.createRedirectFlow(user)
    return flow
}

export default initiate
