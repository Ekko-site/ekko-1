'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.addColumn(
            'StripeCustomerIds',
            'subscriptionId',
            Sequelize.STRING
        )
        return queryInterface.addColumn(
            'StripeCustomerIds',
            'activeUntil',
            Sequelize.DATE
        )
    },

    down: function(queryInterface, Sequelize) {
        queryInterface.removeColumn('StripeCustomerIds', 'subscriptionId')
        return queryInterface.removeColumn('StripeCustomerIds', 'activeUntil')
    }
};
