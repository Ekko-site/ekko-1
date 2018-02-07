import authState from '@/reducers/auth'
import pageState from '@/reducers/page'
import themesState from '@/reducers/theme'
import formsState from '@/reducers/form'
import billingState from '@/reducers/billing'
import domainState from '@/reducers/domain'
import navigationState from '@/reducers/navigation'

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
