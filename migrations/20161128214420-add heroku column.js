'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'Domains',
            'added_to_heroku',
            {
                type: Sequelize.BOOLEAN,
                default: false
            }
        )
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Domains', 'added_to_heroku')
    }
};
