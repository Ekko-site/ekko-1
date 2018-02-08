import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Field, Form} from 'react-redux-form'
import {actions as formActions} from 'react-redux-form'
import { Button } from 'rebass'
import Link from 'redux-first-router-link'
import Helmet from 'react-helmet'

import * as authActions from '@/actions/auth'
import { required } from '@/etc/validator'
import FieldErrors from '@/components/forms/field-errors'
import FormErrors from '@/components/forms/form-errors'
import Mailchimp from '@/components/mailchimp'
import Loading from '@/components/loading'

import * as messages from '@/config/messages'

import { testimonialDuaneImage } from '@/etc/images'

class SignUp extends React.Component {

    handleSubmit = signUp => {
        return this.props.authActions.signUp(signUp)
    };

    getForm() {
        const {signUpForm} = this.props
        const { coupon } = this.props.location
        const { signing_up } = this.props.authState
        return <div>
            <Helmet
                title="Sign up for Ekko"
                meta={[
                    {
                        name: 'description',
                        content: `Sign up to Ekko`
                    }
                ]}
            />
            <div className="container">
    			<div className="grid">
    				<div className="grid__item big-mb one-whole desk--one-half push--desk--one-quarter">
    					<h1 className="center">Sign up to Ekko</h1>
    					<p className="center progress-list">
    						<span className="progress-list__current">1. Your profile</span>
    						<span className="divide">&#8594;</span>
    						<span>2. Connect Facebook</span>
    					</p>
                        <Form className="form form--mega" model="signUp" validators={{
                            firstName: {
                                required
                            },
                            lastName: {
                                required
                            },
                            email: {
                                required
                            },
                            password: {
                                required
                            }
                        }} onSubmit={this.handleSubmit}>
                            <Field model="signUp.firstName">
                                <label htmlFor="first-name">First name</label>
                                <input type="text" className={`full-width i-w-m ${!signUpForm.firstName.valid && signUpForm.firstName.touched ? 'error' : ''}`} id="first-name" />
                                <FieldErrors model="signUp.firstName" messages={{
                                    required: messages.FORM_FIRST_NAME_NULL
                                }} show={signUpForm.submitFailed}/>
                            </Field>

                            <Field model="signUp.lastName">
                                <label htmlFor="last-name">Last name</label>
                                <input type="text" className={`full-width i-w-m ${!signUpForm.lastName.valid && signUpForm.lastName.touched ? 'error' : ''}`} id="last-name" />
                                <FieldErrors model="signUp.lastName" messages={{
                                    required: messages.FORM_LAST_NAME_NULL
                                }} show={signUpForm.submitFailed}/>
                            </Field>

                            <Field model="signUp.email">
                                <label htmlFor="email-address">Email address</label>
                                <input type="email" className={`full-width i-w-m ${!signUpForm.email.valid && signUpForm.email.touched ? 'error' : ''}`} id="email-address" />
                                <FieldErrors model="signUp.email" messages={{
                                    required: messages.FORM_EMAIL_NULL
                                }} show={signUpForm.submitFailed}/>
                            </Field>

                            <Field model="signUp.password" className="half-mb">
                                <label htmlFor="password">Choose a password <span className="note">— minimum 6 characters</span></label>
                                <input type="password" className={`full-width i-w-m ${!signUpForm.password.valid && signUpForm.password.touched ? 'error' : ''}`} id="password" />
                                <FieldErrors model="signUp.password" messages={{
                                    required: messages.FORM_PASSWORD_NULL
                                }} show={signUpForm.submitFailed}/>
                            </Field>

                            <Field model="signUp.coupon" className="half-mb">
                                <label htmlFor="coupon">
                                {(!coupon) && (
                                    <span>Do you have a coupon code?</span>
                                )}
                                {(coupon) && (
                                    <span>Your coupon code</span>
                                )}
                                </label>
                                <input type="text" readOnly={!!(coupon)} value={ coupon } className={`full-width i-w-m`} id="coupon" />
                            </Field>

                            <div className="big-mb">
                                <p>By continuing, you agree to Ekko's <Link to="/terms" target="_BLANK">terms and conditions</Link></p>
                            </div>

                            <FormErrors model="signUp" show="submitFailed"/>

                            {(!signing_up) && (
                                <p className="center big-mb"><button disabled={signUpForm.submitting || signUpForm.validating} className="butt butt--big">Continue</button></p>
                            )}

                            {(signing_up) && (
                                <Loading column />
                            )}

                        </Form>
                    </div>
                </div>
            </div>
            <div className="testimonial-row mt-big">
    			<div className="container">
    				<div className="grid">
    					<div className="grid__item one-whole desk--two-thirds push--desk--one-sixth">
    						<blockquote className="large-quote center">
    							"Ekko's really sped up website and content management for my businesses, and they look better than designs I would've had to spend weeks on"
    						</blockquote>
    						<p className="mini center">
    							<img src={testimonialDuaneImage} className="testimonial-row__img" />
    							<a href="https://twitter.com/DuaneJackson">Duane Jackson</a>
    						</p>
    					</div>
    				</div>
    			</div>
    		</div>
        </div>
    }

    render() {
        return (
            <div>
                {
                    this.getForm()
                }
            </div>
        )
    }

}

SignUp.propTypes = {
    authActions: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        authState: state.authState,
        signUp: state.signUp,
        signUpForm: state.signUpForm,
        location: state.location
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
