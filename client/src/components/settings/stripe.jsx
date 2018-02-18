import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const config = process.env

const Stripe = ({onToken, user}) => {
    return (
        <StripeCheckout token={onToken} stripeKey={config.REACT_APP_STRIPE_TOKEN} email={user.email}>
            <p className="no-mb" style={{
                display: 'inline-block'
            }}>
        		<button className="butt butt--yellow">Pay with card</button>
        	</p>
        </StripeCheckout>
    )
}

export default Stripe
