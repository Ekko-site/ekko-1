import Script from 'react-load-script'
import React from 'react'

import Loading from '@/components/loading'

const config = process.env
const Stripe = window.Stripe

class StripeCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stripeLoaded: false,
            showUpdateCardDetails: false
        }
    }

    stripeLoaded() {
        Stripe.setPublishableKey(config.REACT_APP_STRIPE_TOKEN)
        this.setState({ stripeLoaded: true })
    }

    stripeResponseHandler = (status, response) => {
        if(response && response.id) {
            return this.props.cardUpdate(response.id, response.card)
        }
        return this.props.onError(response.error.message)
    }

    formSubmitted = event => {
        event.preventDefault()
        this.props.onTokenFetch()
        Stripe.card.createToken(event.target, this.stripeResponseHandler)
        return false
    }

    render() {
        if(!this.state.stripeLoaded) {
            return (
                <Script
                    url='https://js.stripe.com/v2/'
                    onLoad={() => this.stripeLoaded() }
                />
            )
        }
        const { user, cardUpdated, cardUpdating } = this.props
        return (
            <div style={{
                marginTop: '2em'
            }}>
                <div className="half-mb">
                    <span className="caps-title">Card in use:</span>
                    <p className="mini faded">
                        { user.StripeCustomerId.brand } **** **** **** { user.StripeCustomerId.last4 }
                    </p>
                </div>
                {(!this.state.showUpdateCardDetails) && (
                    <p className="half-mb">Update your <span className="text-button" onClick={() => this.setState({
                        showUpdateCardDetails: true
                    })}>card details?</span></p>
                )}
                {(cardUpdated) && (
                    <p>Card details updated!</p>
                )}
                {(this.state.showUpdateCardDetails && !cardUpdated) && (
                    <form className="form" onSubmit={this.formSubmitted}>

                      <div className="form-row i-w-m">
                        <label className="mini">
                          <span>Card Number</span>
                        </label>
                        <input type="text" size="20" data-stripe="number" />
                      </div>

                      <div className="form-row i-w-m">
                        <label className="mini">
                          <span>Expiration (MM/YY)</span>
                        </label>
                        <input type="text" size="2" data-stripe="exp_month" />
                        <span> / </span>
                        <input type="text" size="2" data-stripe="exp_year" />
                      </div>

                      <div className="form-row big-mb">
                        <label className="mini">
                          <span>CVC</span>
                        </label>
                        <input type="text" size="4" data-stripe="cvc" />
                      </div>

                      {(cardUpdating) && (
                          <Loading />
                      )}
                      {(!cardUpdating) && (
                          <button className="butt butt--yellow half-mt">Update card details</button>
                      )}
                    </form>
                )}
            </div>
        )
    }

}

export default StripeCard
