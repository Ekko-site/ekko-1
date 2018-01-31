'use strict'
module.exports = function(sequelize, DataTypes) {
    var Theme = sequelize.define('Theme', {
        name: DataTypes.STRING,
        description: DataTypes.STRING
    })
    return Theme
}
