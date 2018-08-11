"use strict";
module.exports = function(sequelize, DataTypes) {
  var Page = sequelize.define(
    "Page",
    {
      data: DataTypes.JSON,
      online: {
        type: DataTypes.BOOLEAN,
        default: true
      },
      facebookPageId: DataTypes.STRING,
      access_token: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      ThemeId: DataTypes.INTEGER,
      analytics_code: DataTypes.STRING,
      subscribed_to_webhook: {
        type: DataTypes.BOOLEAN,
        default: false
      },
      lastFetchedFromFB: {
        type: DataTypes.DATE
      }
    },
    {
      classMethods: {
        associate: function(models) {
          Page.belongsTo(models.User);
          Page.belongsTo(models.Theme);
          Page.hasOne(models.Track);
        }
      }
    }
  );
  return Page;
};
