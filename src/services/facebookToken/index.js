import { FacebookToken } from '@/models'

class FacebookTokens {
    constructor(db) {
        this.db = db || FacebookToken
    }
    async getByUserId(id) {
        const token = await this.db.findOne({
            where: {
                UserId: id
            }
        })
        return token ? token.get({
            plain: true
        }) : null
    }
    async create(token, userId) {
        const existing = await this.getByUserId(userId)
        if(existing){
            return await this.updateToken(token, userId)
        }
        const fbToken = await this.db.create({
            token,
            UserId: userId
        })
        return fbToken
    }
    async updateToken(token, userId) {
        const existing = await this.getByUserId(userId)
        if(!existing) {
            return await this.create(token, userId)
        }
        const updated = await this.db.update({
            token
        }, {
            where: {
                UserId: userId
            }
        })
        return await this.getByUserId(userId)
    }
    async removeByUserId(userId) {
        return await this.db.destroy({
            where: {
                UserId: userId
            }
        })
    }
}

export default FacebookTokens
