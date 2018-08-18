import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Helmet from "react-helmet";

import { Elements } from "react-stripe-elements";

import * as authActions from "@/actions/auth";
import * as pageActions from "@/actions/page";
import * as domainActions from "@/actions/domain";
import * as billingActions from "@/actions/billing";

import Plan from "@/components/settings/plan";
import DomainSearch from "@/components/settings/domain-search";
import PlanChooser from "@/components/settings/plan-chooser";
import DomainsAssigned from "@/components/settings/domains-assigned";
import UpgradeErrors from "@/components/settings/upgrade-errors";
import Account from "@/components/settings/account";
import StripeCard from "@/components/settings/stripe-card";
import CompleteDirectDebit from "@/components/settings/complete-direct-debit";
import DirectDebitPlan from "@/components/settings/direct-debit-plan";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDomain: null
    };
  }

  componentDidMount() {
    if (
      this.props.authState.current_user &&
      this.props.authState.current_user.facebookUserId
    ) {
      this.props.pageActions.pagesFetch();
      this.props.billingActions.billingFetch();
      this.props.domainActions.tldsFetch();
      this.props.domainActions.userPagesFetch();
      const user = this.props.authState.current_user;
      const redirectFlowId =
        this.props.location.query && this.props.location.query.redirect_flow_id;
      if (
        user.DirectDebitCustomerId &&
        !user.DirectDebitCustomerId.customerId &&
        redirectFlowId
      ) {
        this.props.authActions.completeDirectDebit();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.props.authState.current_user &&
      nextProps.authState.current_user &&
      nextProps.authState.current_user.facebookUserId
    ) {
      this.props.pageActions.pagesFetch();
      this.props.billingActions.billingFetch();
      this.props.domainActions.tldsFetch();
      this.props.domainActions.userPagesFetch();
    }
  }

  handleStripeToken = (token, planId) => {
    this.props.authActions.upgrade(token.id, planId);
  };

  onAddDomain = (newDomain, contact, registrar) => {
    this.props.domainActions.addDomain(
      this.state.chosenDomain || this.getUnregisteredDomain(),
      newDomain,
      contact,
      registrar
    );
  };

  handleSettingsSave = (current_password, new_password) => {
    return this.props.authActions.updatePassword(
      current_password,
      new_password
    );
  };

  handleDomainSelection = (domainName, newDomain, contact, registrar) => {
    this.setState(
      {
        chosenDomain: domainName
      },
      () => this.onAddDomain(newDomain, contact, registrar)
    );
  };

  clearDomainSelection = () => {
    this.setState({
      chosenDomain: null
    });
  };

  getUnregisteredDomain() {
    let userPages = this.props.domainState.user_pages;
    let domain = userPages[0];
    return !domain.domainId ? domain.domain : null;
  }

  render() {
    const {
      current_user: user,
      updated_password,
      updating_password
    } = this.props.authState;
    const fullUser =
      user &&
      user.fullUser &&
      (user.StripeCustomerId || user.DirectDebitCustomerId);
    return (
      <div className="container themes huge-mb">
        <Helmet
          title="Ekko Settings"
          meta={[
            {
              name: "description",
              content: `Manage your account, subscription and domains`
            }
          ]}
        />
        <div className="grid">
          <div className="grid__item palm--one-whole two-thirds">
            <h1>Settings</h1>
            <p className="big-mb">Manage your account.</p>
            {!!Object.keys(this.props.authState.upgrade_error).length && (
              <UpgradeErrors error={this.props.authState.upgrade_error} />
            )}
            {!!Object.keys(this.props.authState.card_updating_error).length && (
              <UpgradeErrors error={this.props.authState.card_updating_error} />
            )}
          </div>
        </div>
        <div className="grid">
          <div className="grid__item palm--one-whole one-half">
            <div className="block mb--palm">
              <h3 className="half-mb">Your subscription</h3>
              {user &&
                user.StripeCustomerId && [
                  <Plan
                    plans={this.props.billingState.billing}
                    userPlan={user.StripeCustomerId}
                  />,
                  <Elements>
                    <StripeCard
                      user={this.props.authState.current_user}
                      onError={this.props.authActions.cardUpdatingError}
                      cardUpdating={this.props.authState.card_updating}
                      cardUpdated={this.props.authState.card_updated}
                      cardUpdate={this.props.authActions.updateCustomerCard}
                      onTokenFetch={this.props.authActions.cardUpdatingInit}
                    />
                  </Elements>
                ]}
              {user &&
                user.DirectDebitCustomerId &&
                user.DirectDebitCustomerId.customerId && (
                  <DirectDebitPlan userPlan={user.DirectDebitCustomerId} />
                )}
              {user &&
                !user.StripeCustomerId &&
                user.DirectDebitCustomerId &&
                !user.DirectDebitCustomerId.customerId && (
                  <CompleteDirectDebit
                    url={user.DirectDebitCustomerId.redirectUrl}
                    completingDirectDebit={
                      this.props.authState.completing_direct_debit
                    }
                  />
                )}
              {user &&
                !user.StripeCustomerId &&
                !user.DirectDebitCustomerId && (
                  <PlanChooser
                    plans={this.props.billingState.billing}
                    onToken={this.handleStripeToken}
                    user={this.props.authState.current_user}
                    upgrading={this.props.authState.upgrading}
                    directDebitInitiating={
                      this.props.authState.direct_debit_initiating
                    }
                    setupDirectDebit={this.props.authActions.setupDirectDebit}
                  />
                )}
            </div>
          </div>
          <div className="grid__item palm--one-whole one-half">
            <Account
              updating_password={updating_password}
              updated_password={updated_password}
              user={user}
              handleSettingsSave={this.handleSettingsSave}
              onError={this.props.authActions.updatedPasswordError}
              passwordErrors={this.props.authState.updated_password_error}
              handleCancel={this.props.authActions.deleteAccount}
            />
          </div>
        </div>
        {/* {fullUser && (
            <div className="grid__item palm--one-whole one-half">
              <div className="block mb--palm">
                <h3 className="half-mb">Your domain</h3>
                {fullUser &&
                  !this.props.domainState.user_pages.length && (
                    <div>
                      <p>
                        We're happy to sort your domain out for you, just email
                        us at{" "}
                        <a href="mailto:support@ekko.site">support@ekko.site</a>{" "}
                        and we'll handle everything.
                      </p>
                      <p>
                        Or, if you're happy to use one of our built-in solutions
                        below, do carry on!
                      </p>
                    </div>
                  )}
                {fullUser &&
                  !!this.props.domainState.user_pages.length && (
                    <DomainsAssigned
                      pages={this.props.pageState.pages}
                      userDomains={this.props.domainState.user_pages}
                      onAddDomain={this.onAddDomain}
                      domainRequest={this.props.domainActions.domainRequest}
                      tlds={this.props.domainState.tlds}
                      plans={this.props.billingState.billing}
                      userPlan={
                        user.StripeCustomerId || user.DirectDebitCustomerId
                      }
                      addingDomain={this.props.domainState.adding_domain}
                      onDomainSelection={this.handleDomainSelection}
                    />
                  )}
                {fullUser &&
                  !this.props.domainState.user_pages.length && (
                    <DomainSearch
                      domains={this.props.domainState.domains}
                      onSearch={this.props.domainActions.domainsFetch}
                      searching={this.props.domainState.domains_fetching}
                      onDomainSelection={this.handleDomainSelection}
                      pages={this.props.pageState.pages}
                      addingDomain={this.props.domainState.adding_domain}
                      tlds={this.props.domainState.tlds}
                      plans={this.props.billingState.billing}
                      userPlan={
                        user.StripeCustomerId || user.DirectDebitCustomerId
                      }
                    />
                  )}
              </div>
            </div>
          )} */}
      </div>
    );
  }
}

Settings.propTypes = {
  authActions: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  pageActions: PropTypes.object.isRequired,
  pageState: PropTypes.object.isRequired,
  billingState: PropTypes.object.isRequired,
  domainState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    authState: state.authState,
    pageState: state.pageState,
    billingState: state.billingState,
    domainState: state.domainState,
    location: state.location
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    pageActions: bindActionCreators(pageActions, dispatch),
    domainActions: bindActionCreators(domainActions, dispatch),
    billingActions: bindActionCreators(billingActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
