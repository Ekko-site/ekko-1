'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Tracks', 'views')
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'Tracks',
            'views',
            Sequelize.INTEGER
        )
    }
};
