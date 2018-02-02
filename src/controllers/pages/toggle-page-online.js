import { Users, Pages, FacebookToken } from '@/services'

import formatPageForDisplay from '@/etc/format-page-for-display'
import Slack from '@/etc/slack'

const togglePageOnline = async ({ id }) => {
    const pages = new Pages()
    const page = await pages.getById(id)
    const updated = await pages.togglePageOnline(id, page.online)
    Slack.pageOnlineChange({
        pageId: id,
        online: !page.online
    })
    return {
        updated: formatPageForDisplay(updated)
    }
}

export default togglePageOnline
