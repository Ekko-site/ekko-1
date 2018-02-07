import React from 'react'

import EkkoButton from '@/../ekko-button'
import Icon from '@/components/icon'

const Sync = ({ handleSyncClick }) => {
    return <EkkoButton onClick={handleSyncClick}>
        <Icon name="refresh" /> Sync with Facebook
    </EkkoButton>
}

export default Sync
