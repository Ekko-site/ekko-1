'use strict'
module.exports = function(sequelize, DataTypes) {
    var Domain = sequelize.define('Domain', {
        domain: {
            type: DataTypes.STRING,
            unique: true
        },
        expiresOn: DataTypes.DATE,
        domainId: DataTypes.INTEGER,
        registrantId: DataTypes.INTEGER,
        added_to_heroku: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        applied_template: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        dns_requested: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        dns_resolved: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        registration_in_progress: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                Domain.belongsTo(models.Page)
            }
        }
    })
    return Domain
}
