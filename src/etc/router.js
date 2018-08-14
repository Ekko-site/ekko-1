import express from "express";
import pathToRegExp from "path-to-regexp";
import controllers from "@/controllers";
import response from "@/etc/response";
import { logger } from "@/etc/logger";
import cleanError from "@/etc/clean-error";
import auth from "@/etc/api";

const router = express.Router();

const respondWithError = ({ error, res, ravenClient }) => {
  const { code, message } = error;
  logger.error(code, message);
  //ravenClient.captureException(e);
  if (code == 502) {
    return response({
      status: 400,
      data: {
        error: cleanError(message)
      },
      res
    });
  }
  const userFriendlyMessage = cleanError(message);
  return response({
    status: code,
    data: {
      error: userFriendlyMessage
    },
    res
  });
};

const wrap = fn => {
  return async (req, res, next) => {
    const args = {
      ...req,
      ...req.params,
      ...req.body,
      ...req.query
    };
    try {
      const data = await fn(args, res, next);
      return response({
        res,
        data
      });
    } catch (error) {
      respondWithError({ error, res });
    }
  };
};

router.use(async (req, res, next) => {
  try {
    await auth(req, res, next);
  } catch (error) {
    return respondWithError({ error, res });
  }
});

router.get("/directdebit/initiate", wrap(controllers.directdebit.initiate));
router.get("/directdebit/complete", wrap(controllers.directdebit.complete));
router.post("/directdebit/webhook", wrap(controllers.directdebit.post));

router.post("/domainrequests/add", wrap(controllers.domainrequests.add));

router.post("/domains/search", wrap(controllers.domains.get.search));
router.post("/domains/contact", wrap(controllers.domains.contact.add));
router.get("/domains/tlds", wrap(controllers.domains.get.tlds));
router.get("/domains/page", wrap(controllers.domains.get.byUserPages));
router.get("/domains/user", wrap(controllers.domains.add.addDomain));

router.get("/facebook/page_hook", (req, res) => {
  const result = controllers.facebook.get(req.query);
  return res.send(result);
});
router.post("/facebook/page_hook", wrap(controllers.facebook.post));

router.get(
  "/pages/public/hostname/:hostname",
  wrap(controllers.pages.get.fetchPublicPageByHostname)
);
router.get(
  "/pages/public/:id/preview",
  wrap(controllers.pages.get.fetchPublicPageForPreview)
);
router.get(
  "/pages/public/by-url",
  wrap(controllers.pages.get.fetchPublicPageByURL)
);
router.get("/pages/public/:id", wrap(controllers.pages.get.fetchPublicPage));
router.get("/pages/:userId/sync/:pageId", wrap(controllers.pages.sync));
router.get("/pages/online/:id", wrap(controllers.pages.togglePageOnline));
router.get("/pages/:userId", wrap(controllers.pages.get.fetchPages));
router.get(
  "/pages/page/:facebookPageId",
  wrap(controllers.pages.get.fetchPage)
);
router.get(
  "/pages/:pageId/theme/:themeId",
  wrap(controllers.pages.updateTheme)
);
router.get("/pages/:userId/refresh", wrap(controllers.pages.get.refreshPages));
router.get("/pages/:pageId/analytics", wrap(controllers.pages.saveAnalytics));

router.get("/plans/", wrap(controllers.plans.get.all));

router.post("/stripe/webhook", wrap(controllers.stripe.post));

router.get("/themes/", wrap(controllers.themes.get.all));
router.get("/themes/:id", wrap(controllers.themes.get.one));

router.post("/users/sign-up", wrap(controllers.users.signUp));
router.post("/users/login", wrap(controllers.users.login));
router.post("/users/upgrade", wrap(controllers.users.stripe.upgrade));
router.post("/users/facebook/page", wrap(controllers.users.facebook.page));
router.post(
  "/users/facebook/connect",
  wrap(controllers.users.facebook.connect)
);
router.post("/users/password", wrap(controllers.users.update.password));
router.post("/users/cancel", wrap(controllers.users.cancel));
router.post(
  "/users/change-password",
  wrap(controllers.users.update.changePassword)
);
router.post(
  "/users/request-password-reset",
  wrap(controllers.users.update.requestPasswordReset)
);
router.post("/users/card-update", wrap(controllers.users.stripe.cardUpdate));
router.get("/users/whoami", wrap(controllers.users.get.whoAmI));
router.get("/users/:facebook_id", wrap(controllers.users.get.getByFacebookId));

router.use((req, res) => {
  return res.sendStatus(404);
});

export default router;
