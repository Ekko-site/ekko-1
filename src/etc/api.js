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
  "/api/pages/public/by-url"
];

const getUserFromToken = async (
  req,
  params = {
    whitelist: false
  }
) => {
  const users = new Users();
  const token = hasTokenInHeader(req);
  let userObj;
  try {
    userObj = await auth.fetch(token);
  } catch (e) {
    if (token && !params.whitelist) {
      throw new ApiError(403, messages["403"]);
    }
    return null;
  }
  if (!userObj) {
    if (token && !params.whitelist) {
      throw new ApiError(403, messages["403"]);
    }
    return null;
  }

  const user = await users.getById(userObj.id);
  if (!user) {
    if (token && !params.whitelist) {
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

const api = async req => {
  if (whitelist.indexOf(req.originalUrl) > -1) {
    req.user = await getUserFromToken(req, { whitelist: true });
    return req;
  }
  const serve = req.headers["platform"] && req.headers["platform"] == "serve";
  const token = hasTokenInHeader(req);
  const pages = new Pages();
  const users = new Users();
  const domains = new Domains();
  if (token || serve) {
    if (serve) {
      if (req.originalUrl.match(/preview/)) {
        return req;
      }
      const pageId = req.headers["page_id"];
      const domainHostname = req.headers["domain_hostname"];
      let page;
      if (pageId) {
        page = await pages.getByFacebookId(pageId);
      } else if (domainHostname) {
        const domain = await domains.getByDomain(domainHostname);
        if (!domain) {
          return null;
        }
        page = await pages.getById(domain.PageId);
      }

      if (!page) {
        return null;
      }
      const user = await users.getById(page.UserId);
      if (!user) {
        throw new ApiError(403, {
          message: "Failed to find user associated with page."
        });
      }
      req.user = user.get({
        plain: true
      });
      return req;
    }
    req.user = await getUserFromToken(req);
    if (req.originalUrl == "/api/whoami") {
      return {
        data: {
          user: req.user
        }
      };
    }
    return req;
  } else {
    throw new ApiError(403, messages["403"]);
  }
};

export default api;
