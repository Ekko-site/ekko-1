import React from 'react'
import moment from 'moment'

const LastUpdated = ({ page }) => {
    return <span>{moment(page.updatedAt).fromNow()}</span>
}

export default LastUpdated
