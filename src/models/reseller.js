'use strict'
module.exports = function(sequelize, DataTypes) {
    var Reseller = sequelize.define('Reseller', {
        company: DataTypes.STRING,
        facebookUserId: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Reseller.belongsTo(models.StripeCustomerId)
            }
        }
    })
    return Reseller
}
