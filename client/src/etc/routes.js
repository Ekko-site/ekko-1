import React from 'react'

import App from '@/../containers/app'
import Dashboard from '@/../components/dashboard/index'
import SignUp from '@/../components/signup/index'
import Login from '@/../components/login/index'
import Home from '@/../components/home'
import Settings from '@/../components/settings/index'
import Stats from '@/../components/stats/index'
import Themes from '@/../components/themes/index'
import Theme from '@/../components/themes/theme'
import FourOhFour from '@/../components/404'
import Terms from '@/../components/terms/index'
import ConnectToFacebook from '@/../components/connect-to-facebook'
import PickFacebookPage from '@/../components/pick-facebook-page'
import NoPages from '@/../components/no-pages'
import FAQ from '@/../components/faq/index'
import RequestReset from '@/../components/passwords/request-reset'
import ChangePassword from '@/../components/passwords/change-password'
import About from '@/../components/about/index'

export default function (props = {}) {

    const requireAuth = (nextState, replace) => {
        const isLoggedIn = props.store && props.store.getState().authState.logged_in

        if (!isLoggedIn) {
            replace({
                pathname: '/login',
                state: {
                    nextPathname: nextState.location.pathname
                }
            })
        }
    }

    const requireResetHash = (nextState, replace) => {
        const hasResetHash = nextState.location.query && nextState.location.query.reset_hash
        if (!hasResetHash) {
            return replace({
                pathname: '/login',
                state: {
                    nextPathname: nextState.location.pathname
                }
            })
        }
    }

    const requireFacebook = (nextState, replace) => {
        const isLoggedIn = props.store && props.store.getState().authState.logged_in
        const hasFacebook = isLoggedIn && props.store && props.store.getState().authState.current_user.facebookUserId

        if (!isLoggedIn) {
            return replace({
                pathname: '/login',
                state: {
                    nextPathname: nextState.location.pathname
                }
            })
        }

        if (!hasFacebook) {
            replace({
                pathname: '/connect-to-facebook',
                state: {
                    nextPathname: nextState.location.pathname
                }
            })
        }
    }

    const routes = {
        path: '/',
        component: App,
        indexRoute: {
            component: Home
        },
        childRoutes: [
            {
                path: 'dashboard',
                component: Dashboard,
                onEnter: requireFacebook
            }, {
                path: 'sign-up',
                component: SignUp
            }, {
                path: 'login',
                component: Login
            }, {
                path: 'settings',
                component: Settings,
                onEnter: requireAuth
            }, {
                path: 'stats',
                component: Stats,
                onEnter: requireAuth
            }, {
                path: 'themes',
                component: Themes,
                onEnter: requireAuth
            }, {
                path: 'themes/:id',
                component: Theme
            }, {
                path: 'terms',
                component: Terms
            }, {
                path: 'connect-to-facebook',
                component: ConnectToFacebook,
                onEnter: requireAuth
            }, {
                path: 'pick-facebook-page',
                component: PickFacebookPage,
                onEnter: requireFacebook
            }, {
                path: 'no-pages',
                component: NoPages,
                onEnter: requireFacebook
            }, {
                path: 'faq',
                component: FAQ
            }, {
                path: 'request-reset',
                component: RequestReset
            }, {
                path: 'change-password',
                component: ChangePassword,
                onEnter: requireResetHash
            }, {
                path: 'about',
                component: About,
            }, {
                path: '*',
                component: FourOhFour
            }
        ]
    }

    return routes
}
