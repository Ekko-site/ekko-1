import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Form, Control } from "react-redux-form";
import YouTube from "react-youtube";
import Link from "redux-first-router-link";

import FieldErrors from "@/components/forms/field-errors";
import FormErrors from "@/components/forms/form-errors";
import Loading from "@/components/loading";

import * as pageActions from "@/actions/page";
import * as themeActions from "@/actions/theme";

import Stripe from "@/components/settings/stripe";

const config = process.env;

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!this.props.themesState.themes.length) {
      this.props.themeActions.themesFetch();
    }
  }

  clearCurrentPage = () => {
    return this.props.pageActions.clearFBURLPage();
  };

  clearCurrentTheme = () => this.setState({ selectedTheme: null });

  handleSubmit = fbPage => {
    return this.props.pageActions.pageFetchByFBURL(fbPage);
  };

  changeTheme = id => this.setState({ selectedTheme: id });

  createPageURL(theme) {
    const {
      fbUrlPage: { id }
    } = this.props;
    const extra = theme ? `&theme=${theme}` : "";
    return `${config.REACT_APP_API_URL}/s/${id}?preview=true${extra}`;
  }

  themeNameById(id) {
    if (!this.props.themesState.themes.length) return;
    return this.props.themesState.themes.find(t => t.id === id).name;
  }

  createPreviewLink(id) {
    return (
      <a
        href={this.createPageURL(id)}
        target="_BLANK"
        className="themes__entry__open">
        Full preview
        <span className="inline-icon new-tab no-mr" />
      </a>
    );
  }

  getCTA() {
    return (
      <div className="grid">
        <div className="grid__item one-sixth">
          <div className="create__flow__circle">3</div>
        </div>
        <div className="grid__item five-sixths">
          <Stripe />
          <Link
            to="/sign-up"
            className="create-sign-up butt butt--big butt--yellow">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const fetching = this.props.fbPageForm.fetching.value;
    const {
      fbUrlPage: { id, name: pageName },
      themesState: { themes }
    } = this.props;
    const { selectedTheme } = this.state;
    return (
      <div>
        {!id && (
          <div className="create-header">
            <h1 className="h1 headline">Lets create your website</h1>
            <p className="half-mb">Enter your Facebook Page URL to begin.</p>
            <Form
              className="form form--mega"
              model="fbPage"
              onSubmit={this.handleSubmit}>
              <Control.text
                model="fbPage.url"
                className="full-width i-w-m"
                required
              />

              <FormErrors model="fbPage" />

              {!fetching && (
                <p className="center big-mb">
                  <button className="butt butt--big">Continue</button>
                </p>
              )}

              {fetching && <Loading column />}
            </Form>
          </div>
        )}
        {id && (
          <div className="container create-content">
            <div className="grid big-mb">
              <div className="grid__item one-sixth">
                <div className="create__flow__circle">1</div>
              </div>
              <div className="grid__item five-sixths">
                <h2 className="h2 create-name">
                  {pageName}{" "}
                  <button
                    onClick={this.clearCurrentPage}
                    className="create-edit-name butt butt--yellow">
                    Different page?
                  </button>
                </h2>
              </div>
            </div>
            <div className="grid big-mb">
              <div className="grid__item one-sixth">
                <div className="create__flow__circle">2</div>
              </div>
              <div className="grid__item five-sixths">
                {!!selectedTheme && (
                  <div>
                    <h2 className="h2 create-theme-name">
                      {this.themeNameById(selectedTheme)}{" "}
                      <button
                        onClick={this.clearCurrentTheme}
                        className="create-edit-name butt butt--yellow">
                        Different theme?
                      </button>
                      <a
                        href={this.createPageURL(selectedTheme)}
                        target="_BLANK"
                        className="create-preview-link butt butt--yellow ml-1">
                        Full preview
                        <span className="inline-icon new-tab no-mr" />
                      </a>
                    </h2>
                  </div>
                )}
                {!selectedTheme && (
                  <div className="grid">
                    {themes.map(theme => {
                      const { name, id, description } = theme;
                      return (
                        <div
                          className="grid__item palm--one-whole one-half"
                          key={id}
                          onClick={() => this.changeTheme(id)}>
                          <span className="themes__entry big-mb">
                            <span className="themes__entry__preview text-link">
                              Select theme
                            </span>
                            {this.createPreviewLink(theme.id)}
                            <div className="basic-preview half-mb">
                              <iframe src={this.createPageURL(theme.id)} />
                            </div>
                            <h3 className="no-mb title">{name}</h3>
                            <p className="mini no-mb">{description}</p>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            {!!selectedTheme && this.getCTA()}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fbUrlPage: state.pageState.fb_url_page,
    fbPageForm: state.forms.fbPage,
    themesState: state.themesState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch),
    themeActions: bindActionCreators(themeActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
