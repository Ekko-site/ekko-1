import {
    DOMAIN_FETCH_INIT,
    DOMAIN_FETCHED,
    TLDS_FETCH_INIT,
    TLDS_FETCHED,
    USER_PAGES_FETCH_INIT,
    USER_PAGES_FETCHED,
    ADDING_DOMAIN,
    UPGRADE_ERROR,
    DOMAIN_REQUEST_INIT,
    DOMAIN_REQUESTED
}
from '../constants/action-types'

const initialState = {
    domains: {},
    domains_fetching: false,
    domains_fetched: false,
    user_pages: [],
    user_pages_fetching: false,
    user_pages_fetched: false,
    tlds: [],
    tlds_fetching: false,
    tlds_fetched: false,
    adding_domain: false,
    domain_requesting: false,
    domain_requested: false
}

export default function domainState(state = initialState, action) {
    switch (action.type) {
        case DOMAIN_FETCH_INIT:
            return Object.assign({}, state, {
                domains_fetching: true
            })
        case TLDS_FETCH_INIT:
            return Object.assign({}, state, {
                tlds_fetching: true
            })
        case DOMAIN_FETCHED:
            return Object.assign({}, state, {
                domains_fetched: true,
                domains_fetching: false,
                domains: action.domains
            })
        case TLDS_FETCHED:
            return Object.assign({}, state, {
                tlds_fetched: true,
                tlds_fetching: false,
                tlds: action.tlds
            })
        case USER_PAGES_FETCH_INIT:
            return Object.assign({}, state, {
                user_pages_fetching: true
            })
        case USER_PAGES_FETCHED:
            return Object.assign({}, state, {
                user_pages: action.domains,
                user_pages_fetched: true,
                user_pages_fetching: false,
                adding_domain: false
            })
        case ADDING_DOMAIN:
            return Object.assign({}, state, {
                adding_domain: true
            })
        case UPGRADE_ERROR:
            return Object.assign({}, state, {
                adding_domain: false
            })
        case DOMAIN_REQUEST_INIT:
            return Object.assign({}, state, {
                domain_requesting: true
            })
        case DOMAIN_REQUESTED:
            return Object.assign({}, state, {
                domain_requesting: false,
                domain_requested: true
            })
        default:
            return state
    }
}
