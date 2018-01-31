'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'DirectDebitCustomerIds',
            'active',
            {
              type: Sequelize.BOOLEAN,
              default: true
            }
        )
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('DirectDebitCustomerIds', 'active')
    }
};
