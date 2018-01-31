'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.addColumn(
            'Domains',
            'dns_requested',
            {
              type: Sequelize.BOOLEAN,
              default: false
            }
        )
        return queryInterface.addColumn(
            'Domains',
            'dns_resolved',
            {
              type: Sequelize.BOOLEAN,
              default: false
            }
        )
    },

    down: function(queryInterface, Sequelize) {
        queryInterface.removeColumn('Domains', 'dns_resolved')
        return queryInterface.removeColumn('Domains', 'dns_requested')
    }
};
