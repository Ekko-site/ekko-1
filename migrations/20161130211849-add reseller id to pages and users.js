'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.addColumn(
            'Pages',
            'ResellerId',
            Sequelize.INTEGER
        )
        return queryInterface.addColumn(
            'Users',
            'ResellerId',
            Sequelize.INTEGER
        )
    },

    down: function(queryInterface, Sequelize) {
        queryInterface.removeColumn('Users', 'ResellerId')
        return queryInterface.removeColumn('Pages', 'ResellerId')
    }
};
