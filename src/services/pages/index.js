import moment from 'moment'
import models from './../../models/'
import Themes from './../themes'
import Facebook from './../../etc/facebook'
const { Page } = models
import Users from './../users'

class Pages {
    constructor(db) {
        this.db = db || Page
    }
    async getByFacebookId(id, online = true) {
        const page = await this.db.findOne({
            where: {
                facebookPageId: id,
                online
            }
        })
        return page ? page.get({
            plain: true
        }) : null
    }
    async getAllByFacebookId(id) {
        const page = await this.db.findOne({
            where: {
                facebookPageId: id
            }
        })
        return page ? page.get({
            plain: true
        }) : null
    }
    async getById(id, online) {
        if(typeof online == 'undefined'){
            const page = await this.db.findById(id)
            return page ? page.get({
                plain: true
            }) : null
        }
        const onlinePage = await this.db.findOne({
            where: {
                id,
                online
            }
        })
        return onlinePage ? onlinePage.get({
            plain: true
        }) : null
    }
    async getByUserId(id) {
        const pages = await this.db.findAll({
            where: {
                UserId: id
            }
        })
        return pages
    }
    async removeByUserId(userId) {
        return await this.db.destroy({
            where: {
                UserId: userId
            }
        })
    }
    async togglePageOnline(id, online) {
        let updated = await this.db.update({
            online: !online
        }, {
            where: {
                id
            }
        })
        const page = await this.getById(id)
        return page
    }
    async updateTheme(id, themeId) {
        let updated = await this.db.update({
            ThemeId: themeId
        }, {
            where: {
                id
            }
        })
        const page = await this.getById(id)
        return page
    }
    async updatePage(fbPage) {
        const { id, data, subscribed, access_token } = fbPage
        if(!id){
            return null
        }
        let updated = await this.db.update({
            data,
            subscribed_to_webhook: subscribed,
            access_token,
            lastFetchedFromFB: new Date()
        }, {
            where: {
                facebookPageId: id
            }
        })
        return await this.getAllByFacebookId(id)
    }
    async fetchAndUpdateFromFacebook(token, facebookUserId, userId) {
        const fb = new Facebook(token, facebookUserId)
        const themes = new Themes()
        const facebookPages = await fb.fetchPages()
        if(!facebookPages.pages.length){
            return []
        }
        const theme = await themes.getDefault()
        const updatedFacebookPages = await this.createOrUpdateFacebookPages(
                                                    facebookPages.pages,
                                                    userId,
                                                    theme
                                                )
        return updatedFacebookPages
    }
    async createPage(fbPage, userId, theme = {}) {
        const { id, data, access_token, subscribed } = fbPage
        if(!id){
            return null
        }
        const page = await this.db.create({
            facebookPageId: id,
            UserId: userId,
            data,
            online: false,
            access_token,
            ThemeId: theme.id,
            subscribed_to_webhook: subscribed
        })
        return page
    }
    async updateOrCreatePage(fbPage, userId, theme) {
        const existing = await this.getAllByFacebookId(fbPage.id)
        if(existing){
            return await this.updatePage(fbPage)
        }
        let users = new Users()
        users.updateLastPagesFetchFromFacebook(userId)
        return await this.createPage(fbPage, userId, theme)
    }
    async createOrUpdateFacebookPages(facebookPages, userId, theme) {
        const promises = facebookPages.map(fbPage => this.updateOrCreatePage(fbPage, userId, theme))
        return await Promise.all(promises)
    }
    async saveAnalytics(pageId, code) {
        const updated = await this.db.update({
            analytics_code: code
        }, {
            where: {
                id: pageId
            }
        })
        return await this.getById(pageId)
    }
}

export default Pages
