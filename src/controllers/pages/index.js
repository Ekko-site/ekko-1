import get from "@/controllers/pages/get";
import sync from "@/controllers/pages/sync-by-page-id";
import togglePageOnline from "@/controllers/pages/toggle-page-online";
import updateTheme from "@/controllers/pages/update";
import saveAnalytics from "@/controllers/pages/analytics";

export default {
  get,
  sync,
  togglePageOnline,
  updateTheme,
  saveAnalytics
};
