import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import * as authActions from "@/actions/auth";
import * as pageActions from "@/actions/page";
import * as themeActions from "@/actions/theme";
import * as domainActions from "@/actions/domain";

import Preview from "@/components/preview";
import Loading from "@/components/loading";
import domainHelpers from "@/etc/domain-helpers";
import ApiError from "@/components/api-error";

const config = process.env;

class Dashboard extends React.Component {
  componentDidMount() {
    if (
      this.props.authState.current_user &&
      this.props.authState.current_user.facebookUserId &&
      !this.props.pageState.pages.length
    ) {
      this.props.pageActions.pagesFetch();
      this.props.domainActions.userPagesFetch();
    }
    if (!this.props.themesState.themes.length) {
      this.props.themeActions.themesFetch();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.props.authState.current_user &&
      nextProps.authState.current_user &&
      nextProps.authState.current_user.facebookUserId &&
      !this.props.pageState.pages.length
    ) {
      this.props.pageActions.pagesFetch();
      this.props.domainActions.userPagesFetch();
    }
  }

  render() {
    const {
      pages,
      current,
      page_fetched,
      page_fetching
    } = this.props.pageState;
    const {
      current_user,
      existing_facebook_user,
      fetchingFacebookPage,
      facebookPages
    } = this.props.authState;
    const { themes } = this.props.themesState;
    const { user_pages } = this.props.domainState;

    let page = pages.find(page => page.id == current);
    let pageUrl;
    let theme;

    if (page) {
      pageUrl =
        user_pages.length && config.REACT_APP_NODE_ENV == "production"
          ? domainHelpers.getDomain(page, user_pages)
          : `${config.REACT_APP_API_URL}/s/${page.facebookPageId}`;
      theme = themes.find(theme => theme.id == page.ThemeId);
    }

    return (
      <div>
        <Helmet
          title="Ekko Dashboard"
          meta={[
            {
              name: "description",
              content: `Manage your Ekko sites and change your theme`
            }
          ]}
        />
        {page &&
          theme &&
          page_fetched &&
          !page_fetching &&
          current_user &&
          current_user.facebookUserId && (
            <div>
              {page && <Preview url={pageUrl} page={page} theme={theme} />}
            </div>
          )}
        {!page &&
          !page_fetching &&
          !pages.length &&
          !page_fetched &&
          !current_user && <ApiError />}
      </div>
    );
  }
}

Dashboard.propTypes = {
  authActions: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  pageActions: PropTypes.object.isRequired,
  pageState: PropTypes.object.isRequired,
  themeActions: PropTypes.object.isRequired,
  themesState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    authState: state.authState,
    pageState: state.pageState,
    themesState: state.themesState,
    domainState: state.domainState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    pageActions: bindActionCreators(pageActions, dispatch),
    themeActions: bindActionCreators(themeActions, dispatch),
    domainActions: bindActionCreators(domainActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
