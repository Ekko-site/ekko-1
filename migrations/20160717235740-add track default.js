'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.changeColumn(
            'Track',
            'views', {
                type: Sequelize.INTEGER,
                defaultValue: 0
            }
        )
    },

    down: function(queryInterface, Sequelize) {
        queryInterface.changeColumn(
            'Track',
            'views', {
                type: Sequelize.INTEGER
            }
        )
    }
};
