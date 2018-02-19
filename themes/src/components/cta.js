import React from 'react'

export default ({ ctas }) => {
    const friendlyTypeText = (type) => type.replace(/_/g, ' ').toLowerCase()
    return (
        <div className="cta">
            {ctas.map(cta => {
                return <a className="button white capitalise" href={cta.web_url}>{friendlyTypeText(cta.type)}</a>
            })}
        </div>
    )
}
