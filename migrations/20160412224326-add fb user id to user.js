'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'Users',
            'facebookUserId',
            Sequelize.STRING
        )
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Users', 'facebookUserId')
    }
};
