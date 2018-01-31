'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'Pages',
            'subscribed_to_webhook',
            {
                type: Sequelize.BOOLEAN,
                default: false
            }
        )
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Pages', 'subscribed_to_webhook')
    }
};
