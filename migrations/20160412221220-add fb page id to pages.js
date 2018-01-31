'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'Pages',
            'facebookPageId',
            Sequelize.STRING
        )
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Pages', 'facebookPageId')
    }
};
