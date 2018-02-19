import React from 'react'

const style = {
    about: {
        borderColor: 'rgba(0,0,0,0.1)'
    }
}

export default ({ about, description, emails }) => {
    return (
        <div style={style.about} className="center mb4 border-bottom pb4 max-width-3 mx-auto">
            <h2 className="my2">{about}</h2>
            <p>{description}</p>
            {emails && (
                <p className="mt1">Contact {emails.map(e => {
                    return <a href={`mailto:${e}`}>{ e }</a>
                })}</p>
            )}
        </div>
    )
}
