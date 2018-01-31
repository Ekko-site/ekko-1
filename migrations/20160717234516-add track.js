'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.createTable(
            'Tracks', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                createdAt: {
                    type: Sequelize.DATE
                },
                updatedAt: {
                    type: Sequelize.DATE
                },
                views: Sequelize.INTEGER
            }
        )

    },

    down: function(queryInterface, Sequelize) {
        queryInterface.dropTable('Tracks')
    }
};
