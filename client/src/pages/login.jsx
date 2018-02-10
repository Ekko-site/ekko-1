import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, Control } from 'react-redux-form'
import Link from 'redux-first-router-link'
import Helmet from 'react-helmet'

import * as authActions from '@/actions/auth'
import Loading from '@/components/loading'

class Login extends React.Component {

    handleSubmit = login => {
        return this.props.authActions.login(login)
    };

    render() {
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
                        <Form className="form form--mega" model="login" onSubmit={this.handleSubmit}>
                            <label htmlFor="login.email">Email address</label>
                            <Control.text model="login.email" className="full-width i-w-m" />

                            <label htmlFor="login.password">Password</label>
                            <Control.password model="login.password" className="full-width i-w-m" />

                            <p className="big-mb">
                                <Link to="/request-reset">Forgot your password?</Link>
                            </p>

                            {(!logging_in) && (
                                <p className="center big-mb">
                                    <button className="butt butt--big">Continue</button>
                                </p>
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
        login: state.forms.login
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
