import {
    fetch
} from '@/etc/fetch'

import * as types from '@/constants/action-types'

export function billingFetchInit() {
    return {
        type: types.BILLING_FETCH_INIT
    }
}

export function billingFetched(billing) {
    return {
        type: types.BILLING_FETCHED,
        billing
    }
}

export function billingFetch() {
    return (dispatch, getState) => {

        dispatch(billingFetchInit())

        return fetch('api/plans')
            .then(json => {
                if(!json){
                    return
                }
                dispatch(billingFetched(json.plans))
            })
    }
}
