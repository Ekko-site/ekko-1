import get from './get'
import sync from './sync-by-page-id'
import togglePageOnline from './toggle-page-online'
import updateTheme from './update'
import saveAnalytics from './analytics'

export default {
    '/api/pages/public/hostname/:hostname': get.fetchPublicPageByHostname,
    '/api/pages/public/:id/preview': get.fetchPublicPageForPreview,
    '/api/pages/public/:id': get.fetchPublicPage,
    '/api/pages/:userId/sync/:pageId': sync,
    '/api/pages/online/:id': togglePageOnline,
    '/api/pages/:userId': get.fetchPages,
    '/api/pages/page/:facebookPageId': get.fetchPage,
    '/api/pages/:pageId/theme/:themeId': updateTheme,
    '/api/pages/:userId/refresh': get.refreshPages,
    '/api/pages/:pageId/analytics': saveAnalytics
}
