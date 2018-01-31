'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('DirectDebitSubscriptions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            upcomingPayments: {
                type: Sequelize.JSON
            },
            subscriptionId: {
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
            DirectDebitCustomerIdId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'DirectDebitCustomerIds',
                    key: 'id'
                }
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('DirectDebitSubscriptions');
    }
};
