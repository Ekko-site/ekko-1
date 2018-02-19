import React from 'react'

const style = {
    footer: {
        borderColor: 'rgba(0,0,0,0.1)'
    }
}

export default ({ about }) => {
    return (
        <div style={style.footer} className="max-width-4 mx-auto p2 border-top mt4">
            <p className="inline-block">{about}</p>
            <p className="right">{new Date().getFullYear()}</p>
        </div>
    )
}
