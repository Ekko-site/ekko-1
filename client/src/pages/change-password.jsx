import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Link from 'redux-first-router-link'

import * as authActions from '@/actions/auth'

import Loading from '@/components/loading'

class ChangePassword extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            password: "",
            errors: null
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.authState.changed_password_errors){
            this.showError(newProps.authState.changed_password_errors)
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        if(!this.state.password) {
            return this.showError('Please enter your password')
        }
        this.props.authActions.changePassword(this.state.password, this.props.location.query.reset_hash)
    }

    showError(errors) {
        this.setState({
            errors
        }, () => {
            setTimeout(() => this.setState({ errors: null }), 3000)
        })
    }

    render() {
        const { changing_password, changed_password } = this.props.authState
        return (
            <div className="container">
                <div className="grid">
                    <div className="grid__item one-half">
                        <h1>Change your password</h1>
                        {
                            changing_password && !changed_password && (
                                <span>
                                    <Loading column>
                                        <p className="mini faded">Changing your password.</p>
                                    </Loading>
                                </span>
                            )
                        }
                        {
                            !changing_password && !changed_password && (
                                <form className="form form--mega" action="" onSubmit={this.handleSubmit}>
                                    {this.state.errors && (
                                        <div className="validation-message error title">{ this.state.errors }</div>
                                    )}
                                    <label htmlFor="password">New password</label>
                                    <input type="password" onChange={event => this.setState({ password: event.target.value })} className={`full-width i-w-m`} id="password" value={this.state.password} />
                                    <p className="big-mb"><button className="butt butt--big">Change password</button></p>
                                </form>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

ChangePassword.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
