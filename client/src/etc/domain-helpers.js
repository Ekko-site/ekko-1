const config = process.env

export default {
    getDomain: (page, userPages) => {
        const pageId = page.id
        const pageDomain = userPages.find(u => u.PageId == pageId)
        if(!pageDomain){
            return `${config.REACT_APP_API_URL}/s/${page.facebookPageId}`
        }
        if(pageDomain.domainId || pageDomain.dns_resolved){
            return `http://${pageDomain.domain}`
        }
        return `${config.REACT_APP_API_URL}/s/${page.facebookPageId}`
    }
}
