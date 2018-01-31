'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Domains',
      'PageId',
      {
        type: Sequelize.INTEGER,
        unique: true
      }
    )
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Domains',
      'PageId',
      {
        type: Sequelize.INTEGER
      }
    )
  }
};
