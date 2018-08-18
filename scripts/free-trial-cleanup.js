var moment = require("moment");
var Facebook = require("./../dist/etc/facebook");
var db = require("./../dist/models");
var UserModel = db.User;
var PageModel = db.Page;

var access_token = process.env.FACEBOOK_APP_TOKEN;

var close = function() {
  console.log("Finished free trial cleanup");
  db.sequelize.close();
};

var freeTrialCleanup = function() {
  var thirtyDaysAgo = moment()
    .subtract(30, "days")
    .format("YYYY-MM-DD HH:mm:ss.SS+00");
  return UserModel.findAll({
    where: {
      fullUser: false,
      createdAt: {
        $lt: thirtyDaysAgo
      }
    }
  })
    .then(function(users) {
      console.log(users);
      return Promise.all(
        users.map(function(user) {
          return PageModel.findAll({
            where: {
              UserId: user.id,
              subscribed_to_webhook: true
            }
          }).then(function(pages) {
            return Promise.all(
              pages.map(function(page) {
                return new Promise(function(resolve) {
                  var facebook = new Facebook();
                  facebook
                    .unsubscribeFromPage({
                      facebookPageId: page.facebookPageId,
                      access_token: access_token
                    })
                    .then(function() {
                      page.subscribed_to_webhook = false;
                      page.save().then(resolve);
                    })
                    .catch(resolve);
                });
              })
            );
          });
        })
      ).then(close);
    })
    .catch(close);
};

freeTrialCleanup();
