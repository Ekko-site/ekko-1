import React from 'react'
import {Errors} from 'react-redux-form'

import FormInputError from '@/components/forms/form-input-error'

export default class FormErrors extends React.Component {
    render() {
        return (
            <Errors component={FormInputError} { ...this.props } />
        )
    }
}
