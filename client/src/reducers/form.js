import {
    modelReducer,
    formReducer
} from 'react-redux-form'

const initialSignUpState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    coupon: ''
}

const initialLoginState = {
    email: '',
    password: ''
}

const initialDomainContactState = {
    first_name: '',
    last_name: '',
    address1: '',
    city: '',
    state_province: '',
    postal_code: '',
    country: 'GB',
    email: '',
    phone: '',
}

export default {
    login: modelReducer('login', initialLoginState),
    loginForm: formReducer('login', initialLoginState),
    signUp: modelReducer('signUp', initialSignUpState),
    signUpForm: formReducer('signUp', initialSignUpState),
    domainContact: modelReducer('domainContact', initialDomainContactState),
    domainContactForm: formReducer('domainContact', initialDomainContactState)
}
