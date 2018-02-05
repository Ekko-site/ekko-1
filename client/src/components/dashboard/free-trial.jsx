import React from 'react'
import moment from 'moment'

const daysRemaining = (freeTrialEnd) => {
    freeTrialEnd = freeTrialEnd || new Date()
    const eventdate = moment(freeTrialEnd)
    const todaysdate = moment()
    const left = eventdate.diff(todaysdate, 'days') + 1
    return left <= 0 ? 0 : left
}

const FreeTrial = ({ user }) => {
    const { freeTrialEnd } = user
    const days = daysRemaining(freeTrialEnd)
    return <span> {days} day{days == 1 ? '' : 's'}</span>
}

export default FreeTrial
