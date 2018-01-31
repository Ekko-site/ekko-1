'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.addColumn(
            'DirectDebitCustomerIds',
            'redirectId',
            Sequelize.STRING
        )
        queryInterface.addColumn(
            'DirectDebitCustomerIds',
            'sessionToken',
            Sequelize.STRING
        )
        queryInterface.addColumn(
            'DirectDebitCustomerIds',
            'mandateId',
            Sequelize.STRING
        )
        queryInterface.addColumn(
            'DirectDebitCustomerIds',
            'customerBankAccountId',
            Sequelize.STRING
        )
        return queryInterface.addColumn(
            'DirectDebitCustomerIds',
            'subscriptionId',
            Sequelize.STRING
        )
    },

    down: function(queryInterface, Sequelize) {
        queryInterface.removeColumn('DirectDebitCustomerIds', 'redirectId')
        queryInterface.removeColumn('DirectDebitCustomerIds', 'sessionToken')
        queryInterface.removeColumn('DirectDebitCustomerIds', 'mandateId')
        queryInterface.removeColumn('DirectDebitCustomerIds', 'customerBankAccountId')
        return queryInterface.removeColumn('DirectDebitCustomerIds', 'subscriptionId')
    }
};
