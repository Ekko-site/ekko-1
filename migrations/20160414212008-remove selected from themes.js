'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'Themes',
            'selected'
        )
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'Themes',
            'selected',
            Sequelize.BOOLEAN
        )
    }
};
