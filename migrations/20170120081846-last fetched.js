'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'Pages',
            'lastFetchedFromFB',
            Sequelize.DATE
        )
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Pages', 'lastFetchedFromFB')
    }
};
