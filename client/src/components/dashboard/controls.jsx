import React from 'react'

import EkkoButton from './../ekko-button.jsx'
import Icon from './../icon.jsx'

const Sync = ({ pageEditing, onPageEditing, cancelEditing }) => {
    if(pageEditing){
        return <span>
            <EkkoButton mb={1} onClick={onPageEditing}><Icon name="cloud-upload" /> Publish</EkkoButton>
            <EkkoButton mb={1} onClick={cancelEditing}><Icon name="times-circle" /> Cancel</EkkoButton>
        </span>
    }
    return <EkkoButton mb={1} onClick={onPageEditing}><Icon name="pencil" /> Edit</EkkoButton>
}

export default Sync
