import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import {Provider} from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import createHistory from 'history/createBrowserHistory'
import reducers from './reducers'
import {reducer as toastrReducer} from 'react-redux-toastr'

import localStore from 'store'
import intercom from './etc/intercom'

const config = process.env

const loggerMiddleware = createLogger()

const reducer = combineReducers({
    ...reducers,
    toastr: toastrReducer
})

const getStoreArgs = () => {
    if(config.NODE_ENV == 'production'){
        return compose(
            applyMiddleware(
                thunkMiddleware
            )
        )
    }
    return compose(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
}

const store = createStore(
    reducer,
    {
        authState: {
            logged_in: config.LOGGED_IN,
            current_user: config.LOGGED_IN || null
        }
    },
    getStoreArgs()
)

const history = createHistory()
history.listen(location => {
    if (config.NODE_ENV == 'production') {
        window.ga && window.ga.pageview && window.ga.pageview(location.pathname)
        intercom.locationChange()
    }
    if (location.action == 'PUSH' && location.pathname == '/') {
        typeof window.homepageInit !== 'undefined' && window.homepageInit()
    }
    window.scrollTo(0, 0)
})


class Main extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>

                    <ReduxToastr timeOut={4000} newestOnTop={false} position="top-right"/>
                </div>
            </Provider>
        )
    }
}

export default Main
