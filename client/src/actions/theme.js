import {
    fetch
} from '@/etc/fetch'

import * as types from '@/constants/action-types'

export function themesFetchInit() {
    return {
        type: types.THEMES_FETCH_INIT
    }
}

export function themesFetched(themes) {
    return {
        type: types.THEMES_FETCHED,
        themes
    }
}

export function themesFetch() {
    return (dispatch, getState) => {

        dispatch(themesFetchInit())

        return fetch('api/themes/')
            .then(json => {
                if(!json){
                    return
                }
                dispatch(themesFetched(json.themes))
            })
    }
}
