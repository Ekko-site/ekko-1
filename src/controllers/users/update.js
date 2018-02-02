import { Users } from '@/services'

const update = {
    async password({ user, current_password, new_password }) {
        const users = new Users()
        const updated = await users.changePassword(user.id, current_password, new_password)
        return { }
    },
    async changePassword({ reset_hash, new_password }) {
        const users = new Users()
        const changed = await users.resetPassord(reset_hash, new_password)
        return { }
    },
    async requestPasswordReset({ email }) {
        const users = new Users()
        const sent = await users.requestPasswordReset(email)
        return { }
    }
}

export default update
