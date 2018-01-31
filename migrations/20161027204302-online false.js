'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Pages',
      'online',
      {
        type: Sequelize.BOOLEAN,
        default: false
      }
    )
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Pages',
      'online',
      {
        type: Sequelize.BOOLEAN,
        default: true
      }
    )
  }
};
