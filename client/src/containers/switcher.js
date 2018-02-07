import React from 'react'
import { connect } from 'react-redux'
import { TransitionGroup, Transition } from 'transition-group'
import universal from 'react-universal-component'

const UniversalComponent = universal(({ page = 'home' }) => import(`../pages/${page}`), {
  minDelay: 500
})

const Switcher = ({ page }) =>
  <TransitionGroup
    duration={500}
    prefix='fade'
  >
    <Transition key={page}>
      <UniversalComponent page={page} />
    </Transition>
  </TransitionGroup>

const mapState = ({ page, ...state }) => ({
  page
})

export default connect(mapState)(Switcher)
