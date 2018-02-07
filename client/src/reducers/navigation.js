import { NOT_FOUND } from 'redux-first-router'

export default (state = 'HOME', action = {}) => components[action.type] || state

const components = {
    HOME: 'home',
    ABOUT: 'about',
    CHANGE_PASSWORD: 'change-password',
    CONNECT_TO_FACEBOOK: 'connect-to-facebook',
    DASHBOARD: 'dashboard',
    FAQ: 'faq',
    LOGIN: 'login',
    NO_PAGES: 'no-pages',
    PICK_FACEBOOK_PAGE: 'pick-facebook-page',
    REQUEST_RESET_PASSWORD: 'request-reset-password',
    SETTINGS: 'settings',
    SIGN_UP: 'sign-up',
    TERMS: 'terms',
    THEME: 'theme',
    THEMES: 'themes',
    [NOT_FOUND]: '404'
}
