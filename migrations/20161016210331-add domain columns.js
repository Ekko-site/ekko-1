'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.addColumn(
            'Domains',
            'expiresOn',
            Sequelize.DATE
        )
        queryInterface.addColumn(
            'Domains',
            'domainId',
            Sequelize.INTEGER
        )
        queryInterface.addColumn(
            'Domains',
            'registrantId',
            Sequelize.INTEGER
        )
        return
    },

    down: function(queryInterface, Sequelize) {
        queryInterface.removeColumn('Domains', 'expiresOn')
        queryInterface.removeColumn('Domains', 'domainId')
        queryInterface.removeColumn('Domains', 'registrantId')
        return
    }
};
