'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'Domains',
            'registration_in_progress',
            {
              type: Sequelize.BOOLEAN,
              default: false
            }
        )
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Domains', 'registration_in_progress')
    }
};
