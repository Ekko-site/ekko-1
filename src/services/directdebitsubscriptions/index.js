import { DirectDebitSubscription } from '@/models'

class DirectDebitSubscriptions {
    constructor(db) {
        this.db = db || DirectDebitSubscription
    }
    async addSubscription({
        upcomingPayments,
        subscriptionId,
        DirectDebitCustomerIdId
    }) {
        return await this.db.create({
            upcomingPayments,
            subscriptionId,
            DirectDebitCustomerIdId
        })
    }

    async getSubscriptionsByDirectDebitId(id) {
        return await this.db.findAll({
            DirectDebitCustomerIdId: id
        })
    }
}

export default DirectDebitSubscriptions
