import services from './../../services/'
const { Plans } = services

const get = {
    async all() {
        const plans = new Plans()
        const allPlans = await plans.getAll()
        return {
            plans: allPlans
        }
    }
}

export default get
