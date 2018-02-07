import React from 'react'

import StripeCheckout from '@/stripe.jsx'
import FreeTrial from '@/../dashboard/free-trial.jsx'
import Loading from '@/../loading.jsx'

class PlanChooser extends React.Component {
    render() {
        const { plans, onToken, user, upgrading, directDebitInitiating, setupDirectDebit } = this.props
        if(!plans.length) {
            return <span></span>
        }
        const plan = plans.filter(p => !p.private)[0]
        if(upgrading) {
            return <span>
                <Loading column>
                    <p className="mini faded">Upgrading you right now...sit tight.</p>
                </Loading>
            </span>
        }
        if(directDebitInitiating) {
            return <span>
                <Loading column>
                    <p className="mini faded">Redirecting you to GoCardless to complete your Direct Debit setup.</p>
                </Loading>
            </span>
        }
        return (
            <div>
                <p>Ready to activate?</p>
                <div className="decent-mb">
                    <strong className="raspberry">&pound;{ plan.cost } a month</strong>
                </div>
                <StripeCheckout onToken={token => onToken(token, plan.id)} user={user} />
                <p className="no-mb" style={{
                    display: 'inline-block',
                    marginLeft: '10px'
                }}>
                    <button className="butt butt--yellow" onClick={ setupDirectDebit }>Set up Direct Debit</button>
                </p>
            </div>
        )
    }
}

export default PlanChooser
