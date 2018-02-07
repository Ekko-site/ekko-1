import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import * as authActions from '@/actions/auth'
import * as navActions from '@/actions/navigation'
import * as billingActions from '@/actions/billing'
import * as domainActions from '@/actions/domain'

import store from '@/etc/store'

import Switcher from '@/containers/switcher'
import AppContainer from '@/components/app-container'
import MarketingContainer from '@/components/marketing-container'

const inApp = pathname => ['themes', 'dashboard', 'settings'].some(r => pathname.match(new RegExp(r)))

const onHomepage = pathname => pathname == '/'

let browserHistory

class App extends React.Component {

    static childContextTypes = {
        rebass: PropTypes.object
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.authState.current_user && this.props.authState.current_user) {
            this.props.authActions.logout()
            this.props.navActions.go('HOME')
        }
    }

    render() {
        const user = this.props.authState.current_user
        const { logout } = this.props.authActions
        const marginUnderPageAdmin = !this.props.location.pathname.match(/dashboard/)
        return <Switcher />
        if(inApp(this.props.location.pathname)){
            return <AppContainer user={user} marginUnderPageAdmin={marginUnderPageAdmin} logout={logout}>
                {
                    this.props.children
                }
            </AppContainer>
        }
        return <MarketingContainer loggedIn={!!user} onHomepage={onHomepage(this.props.location.pathname)} path={this.props.location.pathname}>
            {
                this.props.children
            }
        </MarketingContainer>
    }
}

App.propTypes = {
    authActions: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired,
    pageState: PropTypes.object.isRequired,
    themesState: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        location: state.location,
        authState: state.authState,
        pageState: state.pageState,
        themesState: state.themesState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        navActions: bindActionCreators(navActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
