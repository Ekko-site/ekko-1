import React from 'react'
import {Errors} from 'react-redux-form'

import FormInputError from './form-input-error.jsx'

export default class FormErrors extends React.Component {
    render() {
        return (
            <Errors component={FormInputError} { ...this.props } />
        )
    }
}