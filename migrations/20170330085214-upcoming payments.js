'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'DirectDebitCustomerIds',
            'upcomingPayments',
            Sequelize.JSON
        )
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('DirectDebitCustomerIds', 'upcomingPayments')
    }
};
