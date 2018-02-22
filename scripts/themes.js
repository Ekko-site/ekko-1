var env = process.argv[2] || 'production'
var themes = require('./../config/themes')[env]
var db = require('./../src/models')
var ThemeModel = db.Theme

var actions = []
themes.forEach(function (theme) {
  var res = ThemeModel.findById(theme.id).then(function (result) {
    if (!result) {
      console.log('Creating new theme', theme.name, theme.description)
      var created = ThemeModel.create(theme)
      return created
    }
    console.log('Updating theme', theme.name, theme.description)
    var updated = ThemeModel.update({
      name: theme.name,
      description: theme.description
    }, {
      where: {
        id: theme.id
      }
    })
    return updated
  })
  actions.push(res)
})

Promise.all(actions).then(function () {
  process.exit()
})
