import React from 'react'

import EkkoButton from '@/../ekko-button.jsx'
import Icon from '@/../icon.jsx'

const Sync = ({ handleSyncClick }) => {
    return <EkkoButton onClick={handleSyncClick}>
        <Icon name="refresh" /> Sync with Facebook
    </EkkoButton>
}

export default Sync
