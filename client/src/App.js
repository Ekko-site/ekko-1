import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import ReduxToastr from 'react-redux-toastr'

import configureStore from '@/etc/configure-store'
import localStore from 'store'
import intercom from '@/etc/intercom'
import Switcher from '@/containers/switcher'

const history = createHistory()
const { store } = configureStore(history, window.REDUX_STATE)

class Main extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Switcher />
                    <ReduxToastr timeOut={4000} newestOnTop={false} position="top-right"/>
                </div>
            </Provider>
        )
    }
}

export default Main
