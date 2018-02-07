import React from 'react'

import EkkoButton from '@/../ekko-button.jsx'
import Icon from '@/../icon.jsx'

const ThemeLink = () => {
    return <EkkoButton mb={1} to="/themes"><Icon name="rocket" /> Browse themes</EkkoButton>
}

export default ThemeLink
