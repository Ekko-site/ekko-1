import React from 'react'
import { Text } from 'rebass'

import Icon from './../icon.jsx'

const CurrentTheme = ({ selectedTheme, themes }) => {
    if(!themes.length || !selectedTheme){
        return <span></span>
    }
    const currentTheme = themes.find(t => t.id == selectedTheme)
    if(!currentTheme){
        return <span></span>
    }
    return <Text mb={1}><Icon name="bolt" /> <span style={{
        marginLeft: '0.25rem'
    }}>Current theme: <span style={{
        textTransform: 'capitalize'
    }} className="bold">{currentTheme.name}</span></span></Text>
}

export default CurrentTheme
