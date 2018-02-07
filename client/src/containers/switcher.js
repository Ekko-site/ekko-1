import React from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { TransitionGroup, Transition } from 'transition-group'
import universal from 'react-universal-component'

import * as authActions from '@/actions/auth'
import * as navActions from '@/actions/navigation'

import AppContainer from '@/components/app-container'
import MarketingContainer from '@/components/marketing-container'

const UniversalComponent = universal(({ page }) => import(`../pages/${page}`), {
  minDelay: 500
})

const inApp = type => ['THEMES', 'DASHBOARD', 'SETTINGS'].includes(type)

const onHomepage = type => type == 'HOME'
const onDashboard = type => type !== 'DASHBOARD'

const Switcher = ({ page, authState, authActions, location }) => {
  const { type, pathname } = location
  const user = authState.current_user
  const { logout } = authActions
  const marginUnderPageAdmin = !onDashboard(type)
  const child = <TransitionGroup
    duration={500}
    prefix='fade'
  >
    <Transition key={page}>
      <UniversalComponent page={page} />
    </Transition>
  </TransitionGroup>
  if(inApp(type)) {
    return <AppContainer user={user} marginUnderPageAdmin={marginUnderPageAdmin} logout={logout}>
      { child }
    </AppContainer>
  }
  return <MarketingContainer loggedIn={!!user} onHomepage={onHomepage(type)} path={pathname}>
    { child }
  </MarketingContainer>
}

const mapState = ({ navigationState, authState, location, ...state }) => ({
  page: navigationState,
  location,
  authState
})

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(authActions, dispatch),
  navActions: bindActionCreators(navActions, dispatch)
})

export default connect(mapState, mapDispatchToProps)(Switcher)
