'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'Tracks',
            'PageId',
            Sequelize.INTEGER
        )
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Pages', 'PageId')
    }
};
