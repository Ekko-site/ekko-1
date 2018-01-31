'use strict';
module.exports = function(sequelize, DataTypes) {
    var DirectDebitCustomerId = sequelize.define('DirectDebitCustomerId', {
        customerId: DataTypes.STRING,
        redirectId: DataTypes.STRING,
        sessionToken: DataTypes.STRING,
        mandateId: DataTypes.STRING,
        customerBankAccountId: DataTypes.STRING,
        redirectUrl: DataTypes.STRING,
        active: {
            type: DataTypes.BOOLEAN,
            default: true
        }
    }, {
        classMethods: {
            associate: function(models) {
                DirectDebitCustomerId.belongsTo(models.User)
                DirectDebitCustomerId.hasMany(models.DirectDebitSubscription)
            }
        }
    });
    return DirectDebitCustomerId;
};
