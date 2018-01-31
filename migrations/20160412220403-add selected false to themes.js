'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'Themes',
            'selected', {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            }
        )
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'Themes',
            'selected', {
                type: Sequelize.BOOLEAN
            }
        )
    }
};
