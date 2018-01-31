'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.addColumn(
            'StripeCustomerIds',
            'last4',
            Sequelize.STRING
        )
        return queryInterface.addColumn(
            'StripeCustomerIds',
            'brand',
            Sequelize.STRING
        )
    },

    down: function(queryInterface, Sequelize) {
        queryInterface.removeColumn('StripeCustomerIds', 'last4')
        return queryInterface.removeColumn('StripeCustomerIds', 'brand')
    }
};
