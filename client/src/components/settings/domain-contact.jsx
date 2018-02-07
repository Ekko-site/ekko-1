import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Field, Form} from 'react-redux-form'
import {actions as formActions} from 'react-redux-form'

import { required } from '@/etc/validator'
import FieldErrors from '@/components/forms/field-errors'
import FormErrors from '@/components/forms/form-errors'
import Loading from '@/components/loading'

import * as messages from '@/config/messages'
import countryCodes from '@/config/country-codes'

class DomainContact extends React.Component {

    handleSubmit = contact => {
        return this.props.onDomainSelection(this.props.domain, true, contact)
    };

    getForm() {
        const { domainContactForm, addingDomain } = this.props
        return <div>
			<p>To register this domain on your behalf, we need to submit your contact details to the registrar.</p>
            <p className="mini faded">Don't worry, this won't be made public, it's just for legal purposes.</p>
            <Form className="form" model="domainContact" validators={{
                first_name: {
                    required
                },
                last_name: {
                    required
                },
                email: {
                    required
                },
                phone: {
                    required
                },
                address1: {
                    required
                },
                city: {
                    required
                },
                state_province: {
                    required
                },
                country: {
                    required
                },
                postal_code: {
                    required
                }
            }} onSubmit={this.handleSubmit}>
                <Field model="domainContact.first_name">
                    <label htmlFor="first-name">First name</label>
                    <input type="text" className={`full-width i-w-m ${!domainContactForm.fields.first_name.valid && domainContactForm.fields.first_name.touched ? 'error' : ''}`} id="first-name" />
                    <FieldErrors model="domainContact.first_name" messages={{
                        required: messages.FORM_FIRST_NAME_NULL
                    }} show={domainContactForm.submitFailed}/>
                </Field>

                <Field model="domainContact.last_name">
                    <label htmlFor="last-name">Last name</label>
                    <input type="text" className={`full-width i-w-m ${!domainContactForm.fields.last_name.valid && domainContactForm.fields.last_name.touched ? 'error' : ''}`} id="last-name" />
                    <FieldErrors model="domainContact.last_name" messages={{
                        required: messages.FORM_LAST_NAME_NULL
                    }} show={domainContactForm.submitFailed}/>
                </Field>

                <Field model="domainContact.email">
                    <label htmlFor="email-address">Email address</label>
                    <input type="email" className={`full-width i-w-m ${!domainContactForm.fields.email.valid && domainContactForm.fields.email.touched ? 'error' : ''}`} id="email-address" />
                    <FieldErrors model="domainContact.email" messages={{
                        required: messages.FORM_EMAIL_NULL
                    }} show={domainContactForm.submitFailed}/>
                </Field>

                <Field model="domainContact.phone">
                    <label htmlFor="phone">Phone number <span className="note">— international format, ie. for UK - +44 7700 900077</span></label>
                    <input type="phone" className={`full-width i-w-m ${!domainContactForm.fields.phone.valid && domainContactForm.fields.phone.touched ? 'error' : ''}`} id="phone" />
                    <FieldErrors model="domainContact.phone" messages={{
                        required: messages.FORM_PHONE_NULL
                    }} show={domainContactForm.submitFailed}/>
                </Field>

                <Field model="domainContact.address1">
                    <label htmlFor="address1">First line of your address</label>
                    <input type="address1" className={`full-width i-w-m ${!domainContactForm.fields.address1.valid && domainContactForm.fields.address1.touched ? 'error' : ''}`} id="address1" />
                    <FieldErrors model="domainContact.address1" messages={{
                        required: messages.FORM_ADDRESS_NULL
                    }} show={domainContactForm.submitFailed}/>
                </Field>

                <Field model="domainContact.city">
                    <label htmlFor="city">City</label>
                    <input type="city" className={`full-width i-w-m ${!domainContactForm.fields.city.valid && domainContactForm.fields.city.touched ? 'error' : ''}`} id="city" />
                    <FieldErrors model="domainContact.city" messages={{
                        required: messages.FORM_CITY_NULL
                    }} show={domainContactForm.submitFailed}/>
                </Field>

                <Field model="domainContact.state_province">
                    <label htmlFor="state_province">State/county</label>
                    <input type="state_province" className={`full-width i-w-m ${!domainContactForm.fields.state_province.valid && domainContactForm.fields.state_province.touched ? 'error' : ''}`} id="state_province" />
                    <FieldErrors model="domainContact.state_province" messages={{
                        required: messages.FORM_STATE_NULL
                    }} show={domainContactForm.submitFailed}/>
                </Field>

                <Field model="domainContact.postal_code">
                    <label htmlFor="postal_code">Postal code</label>
                    <input type="postal_code" className={`full-width i-w-m ${!domainContactForm.fields.postal_code.valid && domainContactForm.fields.postal_code.touched ? 'error' : ''}`} id="postal_code" />
                    <FieldErrors model="domainContact.postal_code" messages={{
                        required: messages.FORM_POSTAL_CODE_NULL
                    }} show={domainContactForm.submitFailed}/>
                </Field>

                <Field model="domainContact.country">
                    <label htmlFor="country">Country</label>
                    <select id="country" className={`full-width i-w-m ${!domainContactForm.fields.country.valid && domainContactForm.fields.country.touched ? 'error' : ''}`}>
                        {
                            countryCodes.map(country => {
                                return <option value={country.code}>{ country.name } ({ country.code })</option>
                            })
                        }
                    </select>
                    <FieldErrors model="domainContact.country" messages={{
                        required: messages.FORM_COUNTRY_NULL
                    }} show={domainContactForm.submitFailed}/>
                </Field>

                <FormErrors model="domainContact" show="submitFailed"/>

                {(!addingDomain) && (
                    <p className="no-mb">
                        <input type="submit" disabled={domainContactForm.submitting || domainContactForm.validating} className="butt" value="Purchase this domain"></input>
                    </p>
                )}

                {(addingDomain) && (
                    <Loading />
                )}

            </Form>
        </div>
    }

    render() {
        return this.getForm()
    }

}

function mapStateToProps(state) {
    return {
        domainContact: state.domainContact,
        domainContactForm: state.domainContactForm
    }
}

export default connect(mapStateToProps, null)(DomainContact)
