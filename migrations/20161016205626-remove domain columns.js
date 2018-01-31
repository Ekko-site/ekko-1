'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.removeColumn('Domains', 'chargedAmount')
        queryInterface.removeColumn('Domains', 'domainId')
        queryInterface.removeColumn('Domains', 'orderId')
        queryInterface.removeColumn('Domains', 'transactionId')
        return
    },

    down: function(queryInterface, Sequelize) {
        
    }
};
