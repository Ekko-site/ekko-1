import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Link from 'redux-first-router-link'

import * as authActions from '@/../../actions/auth'

import Loading from '@/../loading.jsx'

class RequestReset extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            errors: null
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.authState.requested_password_reset_errors){
            this.showError(newProps.authState.requested_password_reset_errors)
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        if(!this.state.email) {
            return this.showError('Please enter your email address')
        }
        this.props.authActions.requestPasswordReset(this.state.email)
    }

    showError(errors) {
        this.setState({
            errors
        }, () => {
            setTimeout(() => this.setState({ errors: null }), 3000)
        })
    }

    render() {
        const { requesting_password_reset, requested_password_reset } = this.props.authState
        return (
            <div className="container">
                <div className="grid">
                    <div className="grid__item one-half">
                        <h1>Reset your password</h1>
                        {
                            requesting_password_reset && !requested_password_reset && (
                                <span>
                                    <Loading column>
                                        <p className="mini faded">Requesting your password reset.</p>
                                    </Loading>
                                </span>
                            )
                        }
                        {
                            !requesting_password_reset && !requested_password_reset && (
                                <form className="form form--mega" action="" onSubmit={this.handleSubmit}>
                                    {this.state.errors && (
                                        <div className="validation-message error title">{ this.state.errors }</div>
                                    )}
                                    <label htmlFor="email-address">Email address</label>
                                    <input type="email" onChange={event => this.setState({ email: event.target.value })} className={`full-width i-w-m`} id="email-address" value={this.state.email} placeholder="abc@def.com" />
                                    <p className="big-mb"><button className="butt butt--big">Continue</button></p>
                                </form>
                            )
                        }
                        {
                            !requesting_password_reset && requested_password_reset && (
                                <p>Thank you for your password reset request. You should receive an email very shortly with further instructions. If you have any issues, don't hesitate in contacting <a href="mailto:support@ekko.site">Ekko support</a>.</p>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

RequestReset.propTypes = {
    authActions: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(RequestReset)
