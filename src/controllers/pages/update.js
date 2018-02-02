import { Pages } from '@/services/'
import Slack from '@/etc/slack'

const updateTheme = async ({ pageId, themeId }) => {
    const pages = new Pages()
    const updated = await pages.updateTheme(pageId, themeId)
    Slack.themeChange({
        pageId,
        themeId
    })
    return {
        updated
    }
};

export default updateTheme
