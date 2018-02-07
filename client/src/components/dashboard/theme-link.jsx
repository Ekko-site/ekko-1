import React from 'react'

import EkkoButton from '@/../ekko-button'
import Icon from '@/components/icon'

const ThemeLink = () => {
    return <EkkoButton mb={1} to="/themes"><Icon name="rocket" /> Browse themes</EkkoButton>
}

export default ThemeLink
