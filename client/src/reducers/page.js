import {
    PAGE_FETCH_INIT,
    PAGE_FETCHED,
    PAGE_REFRESH_INIT,
    PAGE_REFRESHED,
    PAGE_EDITING,
    PAGE_SYNCED,
    ACTIVATE_THEME,
    SWITCH_CURRENT_PAGE,
    STATS_FETCH_INIT,
    STATS_FETCHED,
    TOGGLING_PAGE_ONLINE,
    LOGOUT,
    ANALYTICS_SAVED,
    ANALYTICS_SAVE_INIT
}
from '@/constants/action-types'

import store from '@/etc/store'

const initialState = {
    pages: [],
    stats: [],
    page_fetching: false,
    page_fetched: false,
    page_editing: false,
    stats_fetching: false,
    current: null,
    toggling_page_online: false,
    analytics_saving: false,
    analytics_saved: false
}

export default function pageState(state = initialState, action) {
    switch (action.type) {
        case PAGE_FETCH_INIT:
        case PAGE_REFRESH_INIT:
            return Object.assign({}, state, {
                page_fetching: true
            })
        case ANALYTICS_SAVE_INIT:
            return Object.assign({}, state, {
                analytics_saving: true
            })
        case ANALYTICS_SAVED:
            return Object.assign({}, state, {
                analytics_saved: true,
                analytics_saving: false,
                pages: [
                    ...state.pages.map(page => {
                        if (page.id == action.page.id) {
                            return action.page
                        }
                        return page
                    })
                ]
            })
        case STATS_FETCH_INIT:
            return Object.assign({}, state, {
                stats_fetching: true
            })
        case STATS_FETCHED:
            return Object.assign({}, state, {
                stats_fetching: false,
                stats: action.stats
            })
        case TOGGLING_PAGE_ONLINE:
            return Object.assign({}, state, {
                toggling_page_online: true
            })
        case PAGE_FETCHED:
        case PAGE_REFRESHED:
            return Object.assign({}, state, {
                page_fetched: true,
                page_fetching: false,
                pages: action.pages,
                current: (action.pages.length) ? action.pages[0].id : null
            })
        case SWITCH_CURRENT_PAGE:
            if (action.id === state.current) return state

            return Object.assign({}, state, {
                current: action.id
            })
        case PAGE_SYNCED:
            return Object.assign({}, state, {
                page_fetched: true,
                page_fetching: false,
                toggling_page_online: false,
                pages: [
                    ...state.pages.map(page => {
                        if (page.id == action.page.id) {
                            return action.page
                        }
                        return page
                    })
                ]
            })
        case ACTIVATE_THEME:
            return Object.assign({}, state, {
                pages: [
                    ...state.pages.map(page => {
                        if (page.id == action.pageId) {
                            return {
                                ...page,
                                ThemeId: action.themeId
                            }
                        }
                        return page
                    })
                ]
            })
        case PAGE_EDITING:
            return Object.assign({}, state, {
                page_editing: !state.page_editing
            })
        case LOGOUT:
            return initialState
        default:
            return state
    }
}
