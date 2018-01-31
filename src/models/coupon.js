'use strict'
module.exports = function (sequelize, DataTypes) {
    var Coupon = sequelize.define('Coupon', {
        code: DataTypes.STRING,
        months: DataTypes.INTEGER,
        discount: DataTypes.INTEGER,
        used: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    })
    return Coupon
}
