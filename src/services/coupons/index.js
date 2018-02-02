import { Coupon } from '@/models'

class Coupons {
    constructor(db) {
        this.db = db || Coupon
    }
    async getByCode(code) {
        const coupon = await this.db.findOne({
            where: {
                code
            }
        })
        return coupon ? coupon.get({
            plain: true
        }) : null
    }
}

export default Coupons
