import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as authActions from '@/../actions/auth'

import FacebookConnect from '@/facebook-connect.jsx'

const ConnectToFacebook = ({ authActions, authState }) => {
    return <FacebookConnect
        facebookConnect={authActions.facebookConnect}
        retryFacebook={authActions.retryFacebook}
        existingFacebookUser={authState.existing_facebook_user}
    />
}

ConnectToFacebook.propTypes = {
    authActions: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        authState: state.authState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectToFacebook)
