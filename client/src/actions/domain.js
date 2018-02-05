import { toastr } from 'react-redux-toastr'

import {
    fetch
} from './../etc/fetch'

import {
    actions as formActions
} from 'react-redux-form'

import * as types from '../constants/action-types'
import * as authActions from './auth'
import * as messages from './../config/messages'

const validateDomain = search => !!(search.match(/\./))

export function domainsFetchInit() {
    return {
        type: types.DOMAIN_FETCH_INIT
    }
}

export function domainsFetched(domains) {
    return {
        type: types.DOMAIN_FETCHED,
        domains
    }
}

export function domainRequestInit() {
    return {
        type: types.DOMAIN_REQUEST_INIT
    }
}

export function domainRequested() {
    return {
        type: types.DOMAIN_REQUESTED
    }
}

export function tldsFetchInit() {
    return {
        type: types.TLDS_FETCH_INIT
    }
}

export function tldsFetched(tlds) {
    return {
        type: types.TLDS_FETCHED,
        tlds
    }
}

export function userPagesFetchInit() {
    return {
        type: types.USER_PAGES_FETCH_INIT
    }
}

export function userPagesFetched(domains) {
    return {
        type: types.USER_PAGES_FETCHED,
        domains
    }
}

export function addingDomain() {
    return {
        type: types.ADDING_DOMAIN
    }
}

export function tldsFetch() {
    return (dispatch, getState) => {

        dispatch(tldsFetchInit())

        return fetch('api/domains/tlds').then(json => {
            if(!json){
                return
            }
            dispatch(tldsFetched(json.tlds))
        })
    }
}

export function userPagesFetch() {
    return (dispatch, getState) => {

        dispatch(userPagesFetchInit())

        return fetch('api/domains/page').then(json => {
            if(!json){
                return
            }
            dispatch(userPagesFetched(json.domains))
        })
    }
}

export function addDomain(domain, shouldRegister, contact = {}, registrar) {
    return (dispatch, getState) => {
        dispatch(authActions.upgradeErrors({}))
        dispatch(addingDomain())
        dispatch(formActions.setErrors('domainContact', false))
        const {
            pageState
        } = getState()

        return fetch('api/domains/user', {
            body: {
                page_id: pageState.pages[0].id,
                domain,
                shouldRegister,
                contact,
                registrar
            }
        }).then(json => {
            if(!json){
                return
            }
            if(json.error){
                dispatch(formActions.batch('domainContact', [
                    formActions.setSubmitFailed('domainContact'),
                    formActions.setErrors('domainContact', json.error)
                ]))
                return dispatch(authActions.upgradeErrors(json.error))
            }
            dispatch(userPagesFetched(json.domains))
            toastr.success('All done', `${domain} has been ${shouldRegister ? 'registered' : 'added'}. Next step: ${shouldRegister ? 'Do nothing' : 'Do nothing, we\'ll be in touch!'}`)
        })
    }
}

export function domainsFetch(search) {
    return (dispatch, getState) => {

        const validSearch = validateDomain(search)

        if(!validSearch){
            return dispatch(authActions.upgradeErrors(messages.DOMAIN_SEARCH_INVALID))
        }

        const {
            pageState
        } = getState()

        dispatch(authActions.upgradeErrors({}))
        dispatch(domainsFetchInit())

        return fetch('api/domains/search', {
            body: {
                search,
                page_id: pageState.pages[0].id
            }
        }).then(json => {
            if(!json){
                return
            }
            if(json.error){
                dispatch(domainsFetched([]))
                return dispatch(authActions.upgradeErrors(json.error))
            }
            dispatch(authActions.upgradeErrors({}))
            dispatch(domainsFetched(json.searches))
        })
    }
}

export function domainRequest(registrar, DomainId) {
    return dispatch => {
        dispatch(domainRequestInit())
        return fetch('api/domainrequests/add', {
            body: {
                registrar,
                DomainId
            }
        }).then(json => {
            if(json.error) {
                dispatch(domainRequested())
                return dispatch(authActions.upgradeErrors(json.error))
            }
            dispatch(authActions.upgradeErrors({}))
            dispatch(domainRequested())
            dispatch(userPagesFetched(json.domains))
            toastr.success('Thank you', 'We\'ll contact you very shortly with the next steps')
        })
    }
}
