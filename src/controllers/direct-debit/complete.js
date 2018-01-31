import services from './../../services/'
const { DirectDebit, Users } = services
import Slack from './../../etc/slack'
import mail from './../../etc/mail'

const complete = async ({ user }) => {
    const directDebit = new DirectDebit()
    const users = new Users()
    const completed = await directDebit.completeRedirectFlow(user)
    const updatedUser = await users.upgradeUser(user.id)
    return {
        user: updatedUser
    }
}

export default complete
