import {
    fetch
} from '@/etc/fetch'
import { toastr } from 'react-redux-toastr'

import * as authActions from '@/actions/auth'
import { go } from '@/actions/navigation'
import * as types from '@/constants/action-types'

import intercom from '@/etc/intercom'

let push

export function pageFetchInit() {
    return {
        type: types.PAGE_FETCH_INIT
    }
}

export function pagesRefreshInit() {
    return {
        type: types.PAGE_REFRESH_INIT
    }
}

export function pageEditing() {
    return {
        type: types.PAGE_EDITING
    }
}

export function pageFetched(pages) {
    return {
        type: types.PAGE_FETCHED,
        pages
    }
}

export function pagesRefreshed(pages) {
    return {
        type: types.PAGE_REFRESHED,
        pages
    }
}

export function pageSynced(page) {
    return {
        type: types.PAGE_SYNCED,
        page
    }
}

export function analyticsSaveInit() {
    return {
        type: types.ANALYTICS_SAVE_INIT
    }
}

export function analyticsSaved(page) {
    return {
        type: types.ANALYTICS_SAVED,
        page
    }
}

export function statsFetchInit() {
    return {
        type: types.STATS_FETCH_INIT
    }
}

export function togglingPageOnline() {
    return {
        type: types.TOGGLING_PAGE_ONLINE
    }
}

export function statsFetched(stats) {
    return {
        type: types.STATS_FETCHED,
        stats
    }
}

export function switchCurrentPage(pageId) {
    return {
        type: types.SWITCH_CURRENT_PAGE,
        id: pageId
    }
}

export function activateTheme(pageId, themeId) {
    return {
        type: types.ACTIVATE_THEME,
        pageId,
        themeId
    }
}

export function saveSettings(pageId) {
    return (dispatch, getState) => {
        const {
            pageState
        } = getState()
        dispatch(saveNewTheme(pageId))
    }
}

export function saveNewTheme(pageId) {
    return (dispatch, getState) => {

        const {
            pageState
        } = getState()

        let themeId = pageState.pages.find(page => page.id == pageId).ThemeId

        return fetch(`api/pages/${pageId}/theme/${themeId}`)
            .then(page => {
                if(!page){
                    return
                }
                dispatch(pageSynced(page))
                toastr.success('Yay', `We've changed your website's theme. ${page.updated.online ? 'The world can now see your new look!' : 'The world won\'t see your new look until you switch your website online'}`)
            })
    }
}

export function togglePageOnline(id) {
    return (dispatch, getState) => {

        dispatch(togglingPageOnline())

        return fetch(`api/pages/online/${id}`)
            .then(json => {
                if(!json){
                    return
                }
                const { updated: page } = json
                dispatch(pageSynced(page))
                if(page.online){
                    return toastr.success('Congratulations', 'Your website is online!')
                }
                return toastr.info('Just to let you know', 'Your website is currently offline')
            })
    }
}

export function statsFetch() {
    return (dispatch, getState) => {

        dispatch(statsFetchInit())

        return fetch('api/tracks/all')
            .then(stats => {
                if(!stats){
                    return
                }
                dispatch(statsFetched(stats))
            })
    }
}

export function pagesFetch() {
    return (dispatch, getState) => {

        dispatch(pageFetchInit())

        const {
            authState
        } = getState()

        return fetch(`api/pages/${authState.current_user.id}`)
            .then(res => {
                if(res.error){
                    toastr.info('Just to let you know', 'Your Facebook access expired')
                    dispatch(authActions.facebookReconnect())
                    dispatch(pageFetched([]))
                    return dispatch(go('CONNECT_TO_FACEBOOK'))
                }
                if(!res.pages.length){
                    dispatch(pageFetched([]))
                    return dispatch(go('NO_PAGES'))
                }
                dispatch(pageFetched(res.pages))
            })
    }
}

export function analyticsSave(pageId, code) {
    return dispatch => {
        dispatch(analyticsSaveInit())
        return fetch(`api/pages/${pageId}/analytics`, {
            body: {
                code
            }
        }).then(res => {
            dispatch(analyticsSaved(res.updated))
        })
    }
}

export function pageFetch(facebookPageId, accessToken) {
    return (dispatch, getState) => {

        dispatch(pageFetchInit())

        const {
            authState
        } = getState()

        return fetch(`api/pages/page/${facebookPageId}`, {
            body: {
                access_token: accessToken
            }
        })
            .then(res => {
                if(res.error){
                    if(res.error.match(/already/)){
                        toastr.info('Just to let you know', res.error)
                        dispatch(pageFetched([]))
                        return dispatch(go('DASHBOARD'))
                    }
                    toastr.info('Just to let you know', 'Your Facebook access expired')
                    dispatch(authActions.facebookReconnect())
                    dispatch(pageFetched([]))
                    return dispatch(go('CONNECT_TO_FACEBOOK'))
                }
                dispatch(pageFetched([res.page]))
                dispatch(go('DASHBOARD'))
                intercom.track('page_chosen')
            })
    }
}

export function pageSync(facebookPageId) {
    return (dispatch, getState) => {

        dispatch(pageFetchInit())

        const {
            authState
        } = getState()

        return fetch(`api/pages/${authState.current_user.id}/sync/${facebookPageId}`)
        .then(res => {
            if(res.error){
                toastr.info('Just to let you know', `We're having a small issue with your Facebook connection`)
                dispatch(authActions.facebookReconnect())
                dispatch(pageFetched([]))
                return dispatch(go('CONNECT_TO_FACEBOOK'))
            }
            dispatch(pageSynced(res))
            toastr.success('Congratulations', 'We\'ve fetched the latest information from your Facebook Page!')
        })
    }
}

export function pagesRefresh() {
    return (dispatch, getState) => {

        dispatch(pagesRefreshInit())

        const {
            authState
        } = getState()

        return fetch(`api/pages/${authState.current_user.id}/refresh`)
            .then(res => {
                if(res.error){
                    toastr.info('Just to let you know', 'Your Facebook access expired')
                    dispatch(authActions.facebookReconnect())
                    dispatch(pagesRefreshed([]))
                    return dispatch(go('CONNECT_TO_FACEBOOK'))
                }
                dispatch(pagesRefreshed(res))
            })
    }
}
