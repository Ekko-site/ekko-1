var Facebook = require('./../../etc/facebook')
var UserModel = require('./../../models/').User
var FacebookTokenModel = require('./../../models/').FacebookToken

module.exports = (req, res) => {
    var id = req.params.userId,
        {
            facebookPageId
        } = req.params

    UserModel.findById(id).then(user => {
        var userObj = user.get({
            plain: true
        })
        FacebookTokenModel.findOne({
            UserId: userObj.id
        }).then(tokenObj => {
            var fb = new Facebook(tokenObj.token, userObj.facebookUserId)
            fb.fetchPage(facebookPageId, (err, page) => {
                req.db.update({
                    data: page.data
                }, {
                    where: {
                        facebookPageId
                    }
                }).then(() => req.db.findOne({
                    where: {
                        UserId: id,
                        facebookPageId
                    }
                }).then(page => res.json(page)))
            })
        })
    })
}
