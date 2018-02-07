import authState from './auth'
import pageState from './page'
import themesState from './theme'
import formsState from './form'
import billingState from './billing'
import domainState from './domain'
import navigationState from './navigation'

const reducers = {
    authState,
    pageState,
    themesState,
    billingState,
    domainState,
    navigationState,
    ...formsState
}

export default reducers
