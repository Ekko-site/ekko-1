import React from 'react'

import EkkoButton from '@/../ekko-button'
import Icon from '@/components/icon'

const Online = ({ page }) => {
    return <EkkoButton onClick={() => window.open(`${config.SITES_URL}${page.facebookPageId}`)}><Icon name="external-link-square" /> View site</EkkoButton>
}

export default Online
