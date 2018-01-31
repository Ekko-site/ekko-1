'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'Domains',
            'applied_template',
            {
                type: Sequelize.BOOLEAN,
                default: false
            }
        )
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Domains', 'applied_template')
    }
};
