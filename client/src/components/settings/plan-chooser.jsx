import React from "react";

import StripeCheckout from "@/components/settings/stripe";
import FreeTrial from "@/components/dashboard/free-trial";
import Loading from "@/components/loading";

class PlanChooser extends React.Component {
  render() {
    const {
      plans,
      onToken,
      user,
      upgrading,
      directDebitInitiating,
      setupDirectDebit
    } = this.props;
    if (!plans.length) {
      return <span />;
    }
    const plan = plans.filter(p => !p.private)[0];
    if (upgrading) {
      return (
        <span>
          <Loading column>
            <p className="mini faded">Upgrading you right now...sit tight.</p>
          </Loading>
        </span>
      );
    }
    if (directDebitInitiating) {
      return (
        <span>
          <Loading column>
            <p className="mini faded">
              Redirecting you to GoCardless to complete your Direct Debit setup.
            </p>
          </Loading>
        </span>
      );
    }
    return (
      <div>
        <p>Ready to activate?</p>
        <div className="decent-mb">
          <strong className="raspberry">
            &#36;
            {plan.cost} a month
          </strong>
        </div>
        <StripeCheckout
          onToken={token => onToken(token, plan.id)}
          user={user}
        />
        <p
          className="no-mb"
          style={{
            display: "inline-block",
            marginLeft: "10px"
          }}>
          <button className="butt butt--yellow" onClick={setupDirectDebit}>
            Set up Direct Debit
          </button>
        </p>
      </div>
    );
  }
}

export default PlanChooser;
