import React from 'react'

import EkkoButton from '@/../ekko-button'
import Icon from '@/../icon'

const Online = ({ handleTogglePageOnline, page, pageFetching, togglingPageOnline }) => {
    return <EkkoButton style={{
        background: page.online ? '#2ecc71' : '#c0392b'
    }} disabled={pageFetching || togglingPageOnline} onClick={handleTogglePageOnline.bind(this, page.id)}>
        {(page.online) && (
            <span><Icon name="check-circle" /> Online</span>
        )}
        {(!page.online) && (
            <span><Icon name="ban" /> Offline</span>
        )}
    </EkkoButton>
}

export default Online
