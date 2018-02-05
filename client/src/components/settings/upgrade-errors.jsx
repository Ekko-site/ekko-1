import React from 'react'

const UpgradeErrors = ({ error }) => {
    if(typeof error !== 'string'){
        return <div>
            {
                Object.keys(error).map(err => {
                    return <div className="validation-message mini error half-mb">
                        {err}: {error[err]}
                    </div>
                })
            }
        </div>
    }
    return <div>
        <div className="validation-message mini error half-mb">{error}</div>
    </div>
}

export default UpgradeErrors
