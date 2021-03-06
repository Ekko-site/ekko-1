'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'Users',
            'freeTrialEnd',
            Sequelize.DATE
        )
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Users', 'freeTrialEnd')
    }
};
