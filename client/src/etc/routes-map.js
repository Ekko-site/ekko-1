import { redirect } from 'redux-first-router'

const requireFacebook = (dispatch, getState) => {
    const {
        authState
    } = getState()
    const { logged_in } = authState
    if (!logged_in || !authState.current_user) {
        return dispatch(redirect({ type: 'LOGIN' }))
    }
    const { facebookUserId } = authState.current_user
    if (!facebookUserId) {
        return dispatch(redirect({ type: 'CONNECT_TO_FACEBOOK' }))
    }
}

const requireAuth = (dispatch, getState) => {
    const {
        authState
    } = getState()
    const { logged_in } = authState
    if (!logged_in) {
        dispatch(redirect({ type: 'LOGIN' }))
    }
}

const requireResetHash = (dispatch,  getState) => {
    const { reset_hash } = getState().location.query
    if (!reset_hash) {
        dispatch(redirect({ type: 'LOGIN' }))
    }
}

export default {
    HOME: '/',
    LOGIN: '/login',
    ABOUT: '/about',
    CHANGE_PASSWORD: {
       path: '/change-password',
       thunk: requireResetHash
    },
    CONNECT_TO_FACEBOOK: {
        path: '/connect-to-facebook',
        thunk: requireAuth
    },
    DASHBOARD: {
        path: '/dashboard',
        thunk: requireFacebook
    } ,
    FAQ: '/faq',
    LOGIN: '/login',
    NO_PAGES: '/no-pages',
    PICK_FACEBOOK_PAGE: {
        path: '/pick-facebook-page',
        thunk: requireFacebook
    },
    REQUEST_RESET_PASSWORD: '/request-reset-password',
    SETTINGS: {
        path: '/settings',
        thunk: requireAuth
    },
    SIGN_UP: '/sign-up',
    TERMS: '/terms',
    THEME: '/themes/:id',
    THEMES: {
        path: '/themes',
        thunk: requireAuth
    }
}
