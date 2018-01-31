'use strict'
module.exports = function(sequelize, DataTypes) {
    var DomainRequest = sequelize.define('DomainRequest', {
        registrar: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                DomainRequest.belongsTo(models.Domain)
            }
        }
    })
    return DomainRequest
}
