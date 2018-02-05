import {
    BILLING_FETCH_INIT,
    BILLING_FETCHED
}
from '../constants/action-types'

const initialState = {
    billing: [],
    billing_fetching: false,
    billing_fetched: false
}

export default function billingState(state = initialState, action) {
    switch (action.type) {
        case BILLING_FETCH_INIT:
            return Object.assign({}, state, {
                billing_fetching: true
            })
        case BILLING_FETCHED:
            return Object.assign({}, state, {
                billing_fetched: true,
                billing_fetching: false,
                billing: action.billing
            })
        default:
            return state
    }
}
