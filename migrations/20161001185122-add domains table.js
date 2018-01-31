'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Domains', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            domain: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            chargedAmount: Sequelize.FLOAT,
            domainId: Sequelize.INTEGER,
            orderId: Sequelize.INTEGER,
            transactionId: Sequelize.INTEGER,
            PageId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Pages',
                    key: 'id'
                }
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('Domains');
    }
};
