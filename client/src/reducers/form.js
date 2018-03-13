const initialSignUpState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  coupon: "",
  signingUp: false
};

const initialLoginState = {
  email: "",
  password: "",
  loggingIn: false
};

const initialFbPage = {
  url: "",
  fetching: false
};

const initialDomainContactState = {
  first_name: "",
  last_name: "",
  address1: "",
  city: "",
  state_province: "",
  postal_code: "",
  country: "GB",
  email: "",
  phone: ""
};

export default {
  login: initialLoginState,
  signUp: initialSignUpState,
  domainContact: initialDomainContactState,
  fbPage: initialFbPage
};
