import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Field, Form} from 'react-redux-form'
import {actions as formActions} from 'react-redux-form'
import Link from 'redux-first-router-link'
import { Button } from 'rebass'
import {toastr} from 'react-redux-toastr'
import Helmet from 'react-helmet'

import * as authActions from '@/actions/auth'
import { required } from '@/etc/validator'
import FieldErrors from '@/components/forms/field-errors'
import FormErrors from '@/components/forms/form-errors'
import Loading from '@/components/loading'

import * as messages from '@/config/messages'

class Login extends React.Component {

    handleSubmit = login => {
        return this.props.authActions.login(login)
    };

    render() {
        console.log(this.props)
        const { loginForm } = this.props
        const { logging_in } = this.props.authState
        return (
            <div className="container">
                <Helmet
                    title="Log in to Ekko"
                    meta={[
                        {
                            name: 'description',
                            content: `Log in to Ekko`
                        }
                    ]}
                />
    			<div className="grid">
    				<div className="grid__item big-mb one-whole desk--one-half push--desk--one-quarter">
    					<h1 className="center">Log in to Ekko</h1>
                        <Form className="form form--mega" model="login" validators={{
                            email: {
                                required
                            },
                            password: {
                                required
                            }
                        }} onSubmit={this.handleSubmit}>
                            <Field model="login.email">
                                <label htmlFor="email-address">Email address</label>
                                <input type="email" className={`full-width i-w-m ${!loginForm.email.valid && loginForm.email.touched ? 'error' : ''}`} id="email-address" />
                                <FieldErrors model="login.email" messages={{
                                    required: messages.FORM_EMAIL_NULL
                                }} show={loginForm.submitFailed}/>
                            </Field>

                            <Field model="login.password">
                                <label htmlFor="password">Password</label>
                                <input type="password" className={`full-width i-w-m ${!loginForm.password.valid && loginForm.password.touched ? 'error' : ''}`} id="password" />
                                <FieldErrors model="login.password" messages={{
                                    required: messages.FORM_PASSWORD_NULL
                                }} show={loginForm.submitFailed}/>
                            </Field>

                            <p className="big-mb">
                                <Link to="/request-reset">Forgot your password?</Link>
                            </p>

                            <FormErrors model="login" show="submitFailed"/>

                            {(!logging_in) && (
                                <p className="center big-mb"><button disabled={loginForm.submitting || loginForm.validating} className="butt butt--big">Continue</button></p>
                            )}

                            {(logging_in) && (
                                <Loading column />
                            )}

                        </Form>
                    </div>
                </div>
            </div>
        )
    }

}

Login.propTypes = {
    authActions: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        authState: state.authState,
        login: state.login,
        loginForm: state.loginForm
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
