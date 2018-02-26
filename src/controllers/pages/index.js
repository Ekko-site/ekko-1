import get from "@/controllers/pages/get";
import sync from "@/controllers/pages/sync-by-page-id";
import togglePageOnline from "@/controllers/pages/toggle-page-online";
import updateTheme from "@/controllers/pages/update";
import saveAnalytics from "@/controllers/pages/analytics";

export default {
  "/api/pages/public/hostname/:hostname": get.fetchPublicPageByHostname,
  "/api/pages/public/:id/preview": get.fetchPublicPageForPreview,
  "/api/pages/public/by-url": get.fetchPublicPageByURL,
  "/api/pages/public/:id": get.fetchPublicPage,
  "/api/pages/:userId/sync/:pageId": sync,
  "/api/pages/online/:id": togglePageOnline,
  "/api/pages/:userId": get.fetchPages,
  "/api/pages/page/:facebookPageId": get.fetchPage,
  "/api/pages/:pageId/theme/:themeId": updateTheme,
  "/api/pages/:userId/refresh": get.refreshPages,
  "/api/pages/:pageId/analytics": saveAnalytics
};
