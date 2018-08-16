"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.changeColumn("Pages", "online", {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    });
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.changeColumn("Pages", "online", {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  }
};
