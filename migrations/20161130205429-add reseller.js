'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Resellers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            company: {
                type: Sequelize.STRING
            },
            StripeCustomerId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'StripeCustomerIds',
                    key: 'id'
                }
            },
            facebookUserId: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('Resellers');
    }
};
