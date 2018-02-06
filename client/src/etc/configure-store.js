import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import { connectRoutes } from 'redux-first-router'
import { reducer as toastrReducer } from 'react-redux-toastr'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import routesMap from './routes-map'
import options from './options'
import reducers from './../reducers'
import * as actionCreators from './../actions'

const config = process.env

export default (history, preLoadedState) => {
    const { reducer: routerReducer, middleware, enhancer, thunk } = connectRoutes(
        history,
        routesMap,
        options
    )

    const loggerMiddleware = createLogger()

    const rootReducer = combineReducers({
        ...reducers,
        toastr: toastrReducer,
        location: routerReducer
    })

    const middlewares = applyMiddleware(middleware, thunkMiddleware, loggerMiddleware)
    const enhancers = composeEnhancers(enhancer, middlewares)
    const store = createStore(rootReducer, preLoadedState, enhancers)

    return { store, thunk }
}

const composeEnhancers = (...args) =>
    typeof window !== 'undefined'
        ? composeWithDevTools({ actionCreators })(...args)
        : compose(...args)
