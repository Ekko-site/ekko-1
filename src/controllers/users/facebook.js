import Facebook from "@/etc/facebook";
import { Users, Themes, FacebookToken } from "@/services";

import ApiError from "@/etc/error";
import Slack from "@/etc/slack";

const page = async ({ facebook_id, facebook_access_token, user }) => {
  if (user && !facebook_id && user.facebookUserId) {
    const facebookToken = new FacebookToken();
    const tokenObj = await facebookToken.getByUserId(user.id);
    if (!tokenObj) {
      throw new ApiError(400, "Not connected to Facebook");
    }
    facebook_id = user.facebookUserId;
    facebook_access_token = tokenObj.token;
  }

  if (!facebook_id) {
    return {
      pages: []
    };
  }

  const facebook = new Facebook(facebook_access_token, facebook_id);

  const facebookPages = await facebook.fetchPages({
    withoutContent: true
  });
  const { pages } = facebookPages;
  return {
    pages
  };
};

const connect = async ({ facebook_id, facebook_access_token, email, user }) => {
  const { id } = user;
  const users = new Users();
  const fbUser = await users.getByFacebookId(facebook_id);
  if ((email && fbUser && fbUser.get("email") == email) || !fbUser) {
    const { fbUser: user, error } = await users.connectUserToFacebook(
      id,
      facebook_id,
      facebook_access_token
    );
    if (error) {
      throw new ApiError(502, {
        error
      });
    }
    Slack.newFacebookConnect({
      id,
      facebookUserId: facebook_id
    });
    return {
      user
    };
  }
  return {
    existing: true
  };
};

export default {
  page,
  connect
};
