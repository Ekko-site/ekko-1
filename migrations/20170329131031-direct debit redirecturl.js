'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'DirectDebitCustomerIds',
            'redirectUrl',
            Sequelize.STRING
        )
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('DirectDebitCustomerIds', 'redirectUrl')
    }
};
