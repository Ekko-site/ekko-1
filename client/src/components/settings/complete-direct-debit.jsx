import React from 'react'

import Loading from './../loading.jsx'

export default props => {
    if (props.completingDirectDebit) {
        return <span>
            <Loading column>
                <p className="mini faded">Completing your Direct Debit setup.</p>
            </Loading>
        </span>
    }
    return <a href={props.url}>Complete Direct Debit setup</a>
}
