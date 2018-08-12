import ApiError from "@/etc/error";
import auth from "@/etc/auth";
import messages from "@/etc/messages";
import { Users, Pages, Domains } from "@/services";

const whitelist = [
  "/api/users/sign-up",
  "/api/users/login",
  "/api/users/facebook/page",
  "/api/plans",
  "/api/domains/tlds",
  "/api/facebook/page_hook",
  "/api/stripe/webhook",
  "/api/directdebit/webhook",
  "/api/users/change-password",
  "/api/users/request-password-reset",
  "/api/pages/public/by-url",
  "/api/themes/"
];

const getUserFromToken = async ({ req, token }) => {
  const users = new Users();
  let userObj;
  try {
    userObj = await auth.fetch(token);
  } catch (e) {
    if (token) {
      throw new ApiError(403, messages["403"]);
    }
    return null;
  }
  if (!userObj) {
    if (token) {
      throw new ApiError(403, messages["403"]);
    }
    return null;
  }

  const user = await users.getById(userObj.id);
  if (!user) {
    if (token) {
      throw new ApiError(403, messages["403"]);
    }
    return null;
  }
  const reqUser = user.get({
    plain: true
  });
  reqUser.token = token;
  return reqUser;
};

const hasTokenInHeader = req => {
  return req.body.token || req.query.token || req.headers["x-access-token"];
};

const api = async (req, res, next) => {
  if (whitelist.includes(req.originalUrl)) {
    return next();
  }
  const token = hasTokenInHeader(req);
  if (token) {
    try {
      req.user = await getUserFromToken({ req, token });
      return next();
    } catch (error) {
      throw new ApiError(403, messages["403"]);
    }
  } else {
    throw new ApiError(403, messages["403"]);
  }
};

export default api;
