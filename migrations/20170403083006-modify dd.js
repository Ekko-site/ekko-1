'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.removeColumn('DirectDebitCustomerIds', 'subscriptionId')
        return queryInterface.removeColumn('DirectDebitCustomerIds', 'upcomingPayments')
    },

    down: function(queryInterface, Sequelize) {
        queryInterface.addColumn('DirectDebitCustomerIds', 'subscriptionId', Sequelize.STRING)
        return queryInterface.addColumn('DirectDebitCustomerIds', 'upcomingPayments', Sequelize.JSON)
    }
};
