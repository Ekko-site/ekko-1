import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Form, Control } from 'react-redux-form'
import Link from 'redux-first-router-link'
import Helmet from 'react-helmet'

import * as authActions from '@/actions/auth'
import FieldErrors from '@/components/forms/field-errors'
import FormErrors from '@/components/forms/form-errors'
import Mailchimp from '@/components/mailchimp'
import Loading from '@/components/loading'

import { testimonialDuaneImage } from '@/etc/images'

class SignUp extends React.Component {

    handleSubmit = signUp => {
        return this.props.authActions.signUp(signUp)
    };

    getForm() {
        const { coupon } = this.props.location
        const signingUp = this.props.signUp.signingUp.value
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
                        <Form className="form form--mega" model="signUp" onSubmit={this.handleSubmit}>
                            <label htmlFor="signUp.firstName">First name</label>
                            <Control.text model="signUp.firstName" className="full-width i-w-m" required />

                            <label htmlFor="signUp.lastName">Last name</label>
                            <Control.text model="signUp.lastName" className="full-width i-w-m" required />

                            <label htmlFor="signUp.email">Email address</label>
                            <Control.text model="signUp.email" className="full-width i-w-m" required />

                            <label htmlFor="signUp.password">Choose a password <span className="note">— minimum 6 characters</span></label>
                            <Control.password model="signUp.password" className="full-width i-w-m" required />

                            <label htmlFor="signUp.coupon">
                                {(!coupon) && (
                                    <span>Do you have a coupon code?</span>
                                )}
                                {(coupon) && (
                                    <span>Your coupon code</span>
                                )}
                            </label>
                            <Control.text
                                model="signUp.coupon"
                                readOnly={!!(coupon)}
                                className="full-width i-w-m"
                            />

                            <div className="big-mb">
                                <p>By continuing, you agree to Ekko's <Link to="/terms" target="_BLANK">terms and conditions</Link></p>
                            </div>

                            <FormErrors model="signUp" />

                            { 
                                !signingUp && 
                                    <p className="center big-mb">
                                        <button className="butt butt--big">Continue</button>
                                    </p>
                            }

                            { signingUp && <Loading column /> }

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
        location: state.location,
        authState: state.authState,
        signUp: state.signUp
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
