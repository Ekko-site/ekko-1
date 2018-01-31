'use strict';
module.exports = function(sequelize, DataTypes) {
    var FacebookToken = sequelize.define('FacebookToken', {
        token: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                FacebookToken.belongsTo(models.User)
            }
        }
    });
    return FacebookToken;
};
