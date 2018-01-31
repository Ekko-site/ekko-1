class Plans {
    async getAll() {
        const plans = require('./../../../config/stripe-plans')
        return plans
    }
}

export default Plans
