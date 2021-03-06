import React from "react";
import moment from "moment";

const freeStripePlanId = "free-for-life";

const Plan = ({ plans, userPlan }) => {
  if (!plans.length) {
    return <span />;
  }
  const plan = {
    ...userPlan,
    ...plans[0]
  };
  return (
    <div>
      <h4 className="half-mb caps-title">{plan.name} plan</h4>
      <p className="bold tiny-mb">
        &#36;
        {plan.cost} a {plan.interval}
      </p>
      <p className="mini faded tiny-mb">
        Next charge: {moment(userPlan.activeUntil).format("Do MMM, YYYY")}
      </p>
    </div>
  );
};

export default Plan;
