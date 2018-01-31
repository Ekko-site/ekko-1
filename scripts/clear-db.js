
var db = require('./../dist/models')

db.sequelize.sync({
    force: true
}).then(process.exit)
