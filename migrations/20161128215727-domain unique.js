'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Domains',
      'domain',
      {
        type: Sequelize.STRING,
        unique: true
      }
    )
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Domains',
      'domain',
      {
        type: Sequelize.STRING
      }
    )
  }
};
