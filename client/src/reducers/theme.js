import {
    THEMES_FETCH_INIT,
    THEMES_FETCHED,
    LOGOUT
}
from '../constants/action-types'

import store from '@/../etc/store'

const initialState = {
    themes: [],
    themes_fetching: false,
    themes_fetched: false
}

export default function themesState(state = initialState, action) {
    switch (action.type) {
        case THEMES_FETCH_INIT:
            return Object.assign({}, state, {
                themes_fetching: true
            })
        case THEMES_FETCHED:
            return Object.assign({}, state, {
                themes_fetched: true,
                themes_fetching: false,
                themes: action.themes
            })
        case LOGOUT:
            return initialState
        default:
            return state
    }
}
