import React from 'react'
import moment from 'moment'

const getNextPayment = ({ DirectDebitSubscriptions = [] }) => {
    let upcomingPayments = []
    DirectDebitSubscriptions.forEach(d => {
        upcomingPayments = [
            ...upcomingPayments,
            ...d.upcomingPayments
        ]
    })
    const next = upcomingPayments.filter(u => new Date(u.charge_date) > new Date())
    if(next.length) {
        return <div>
            <p className="half-mb">Next payment: <strong>{ moment(next[0].charge_date).format('Do MMM, YYYY') }</strong></p>
            <p className="no-mb">Amount: <strong>£{ next[0].amount / 100 }</strong></p>
        </div>
    }
}

export default ({ userPlan }) => {
    return <div>
        <p>Direct Debit <span className={`direct-debit-status direct-debit-status-${ userPlan.active ? 'active' : 'inactive' }`}>{ userPlan.active ? 'active' : 'inactive' }</span></p>
        { getNextPayment(userPlan) }
    </div>
}
