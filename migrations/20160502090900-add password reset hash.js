'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'Users',
            'passwordResetHash', {
                type: Sequelize.STRING,
                defaultValue: Sequelize.UUIDV1
            }
        )
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Users', 'passwordResetHash')
    }
};
