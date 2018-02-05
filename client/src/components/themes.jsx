import React from 'react'
import { Text, Heading } from 'rebass'

const Themes = ({themes, activateTheme, selectedTheme, page}) => {
    return (
        <div className="themes mb2" style={{
                borderBottomStyle: 'solid',
                borderBottomWidth: '1px',
                borderBottomColor: 'rgba(5,37,55,.19)',
                paddingBottom: '1rem'
            }}>
            <Heading style={{
                color: '#292e31',
                fontSize: '16px',
                fontWeight: 500,
                marginBottom: '8px'
            }}>Themes</Heading>
            {(themes.map(theme => {
                return <div key={theme.id}>
                    <label className="flex items-center">
                        <Text style={{
                            flexGrow: 1,
                            textTransform: 'capitalize'
                        }}>{theme.name}</Text>
                        <input type="checkbox" onChange={() => activateTheme(page.id, theme.id)} checked={theme.id == selectedTheme} />
                    </label>
                </div>
            }))}
        </div>
    )
}

export default Themes
