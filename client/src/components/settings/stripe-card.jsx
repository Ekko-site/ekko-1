import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements";
import Loading from "@/components/loading";

class StripeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateCardDetails: false
    };
  }

  stripeResponseHandler = response => {
    if (response && response.id) {
      return this.props.cardUpdate(response.id, response.card);
    }
    return this.props.onError(response.error.message);
  };

  createToken = async form => await this.props.stripe.createToken(form);

  formSubmitted = async event => {
    event.preventDefault();
    const result = await this.createToken();
    this.props.onTokenFetch();
    this.stripeResponseHandler(result);
    return false;
  };

  render() {
    const { user, cardUpdated, cardUpdating } = this.props;
    return (
      <div
        style={{
          marginTop: "2em"
        }}>
        <div className="half-mb">
          <span className="caps-title">Card in use:</span>
          <p className="mini faded">
            {user.StripeCustomerId.brand} **** **** ****{" "}
            {user.StripeCustomerId.last4}
          </p>
        </div>
        {!this.state.showUpdateCardDetails &&
          1 == 2 && (
            <p className="half-mb">
              Update your{" "}
              <span
                className="text-button"
                onClick={() =>
                  this.setState({
                    showUpdateCardDetails: true
                  })
                }>
                card details?
              </span>
            </p>
          )}
        {cardUpdated && <p>Card details updated!</p>}
        {this.state.showUpdateCardDetails &&
          !cardUpdated && (
            <form className="form" onSubmit={this.formSubmitted}>
              <CardNumberElement />
              <CardExpiryElement />
              <CardCVCElement />

              {cardUpdating && <Loading />}
              {!cardUpdating && (
                <button className="butt butt--yellow half-mt">
                  Update card details
                </button>
              )}
            </form>
          )}
      </div>
    );
  }
}

export default injectStripe(StripeCard);
