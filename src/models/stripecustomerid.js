'use strict';
module.exports = function(sequelize, DataTypes) {
    var StripeCustomerId = sequelize.define('StripeCustomerId', {
        customerId: DataTypes.STRING,
        plan: DataTypes.STRING,
        subscriptionId: DataTypes.STRING,
        activeUntil: DataTypes.DATE,
        last4: DataTypes.STRING,
        brand: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                StripeCustomerId.belongsTo(models.User)
            }
        }
    });
    return StripeCustomerId;
};
