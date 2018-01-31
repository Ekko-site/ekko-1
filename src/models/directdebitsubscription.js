'use strict';
module.exports = function (sequelize, DataTypes) {
    var DirectDebitSubscription = sequelize.define('DirectDebitSubscription', {
        upcomingPayments: DataTypes.JSON,
        subscriptionId: DataTypes.STRING
    }, {
            classMethods: {
                associate: function (models) {
                    DirectDebitSubscription.belongsTo(models.DirectDebitCustomerId)
                }
            }
        });
    return DirectDebitSubscription
};
