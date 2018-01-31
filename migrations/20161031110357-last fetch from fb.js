'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'Users',
            'lastPagesFetchFromFacebook',
            Sequelize.DATE
        )
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Users', 'lastPagesFetchFromFacebook')
    }
};
