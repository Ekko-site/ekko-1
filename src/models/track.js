'use strict'
module.exports = function(sequelize, DataTypes) {
    var Track = sequelize.define('Track', {

    }, {
        classMethods: {
            associate: function(models) {
                Track.belongsTo(models.Page)
            }
        }
    })
    return Track
}
