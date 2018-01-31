import services from './../../services/'
const { Pages } = services
import formatPageForDisplay from './../../etc/format-page-for-display'

const save = async ({ pageId, code }) => {
    const pages = new Pages()
    const updated = await pages.saveAnalytics(pageId, code)
    return {
        updated: formatPageForDisplay(updated)
    }
};

export default save
