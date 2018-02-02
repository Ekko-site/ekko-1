class Plans {
    async getAll() {
        const plans = require('#/stripe-plans')
        return plans
    }
}

export default Plans
