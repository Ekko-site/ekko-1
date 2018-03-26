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
    this.state = {
      selectedTheme: 3
    };
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
    const { fbUrlPage: { id } } = this.props;
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

export default connect(mapStateToProps, mapDispatchToProps)(Create);

{
  /* <div className="home-extended-intro cf" id="learn-more">
    <div className="container">
    <div className="grid">
        <div className="grid__item one-whole">
        <div className="video-container">
            <YouTube
            videoId="aRTUe5kUGYI"
            opts={{
                height: "540",
                width: "960",
                playerVars: {
                rel: 0,
                controls: 1,
                modestbranding: 1,
                showinfo: 0
                }
            }}
            />
        </div>
        </div>
        <div className="grid__item one-whole lap--five-sixths push--lap--one-twelfth desk--two-thirds push--desk--one-sixth">
        <h2 className="home-extended-intro__main-title center">
            Use your Facebook content to power your website.
        </h2>
        </div>
    </div>
    <div className="grid">
        <div className="grid__item palm--one-whole lap--one-half desk--five-twelfths push--desk--one-twelfth">
        <ol className="home-extended-intro__flow">
            <span className="border" />
            <li>
            <div className="grid cf">
                <div className="grid__item one-sixth">
                <div className="home-extended-intro__flow__circle">
                    1
                </div>
                </div>
                <div className="grid__item five-sixths">
                <div className="home-extended-intro__flow__text">
                    <p>
                    Update your Facebook page — whether that’s a
                    new status, biography, a photo, or simply
                    new opening hours.
                    </p>
                </div>
                </div>
            </div>
            </li>
            <li>
            <div className="grid cf">
                <div className="grid__item one-sixth">
                <div className="home-extended-intro__flow__triangle">
                    <span>2</span>
                </div>
                </div>
                <div className="grid__item five-sixths">
                <div className="home-extended-intro__flow__text">
                    <p>
                    Facebook informs Ekko of this update and we
                    fetch your latest Page data.
                    </p>
                </div>
                </div>
            </div>
            </li>
            <li className="home-extended-intro__flow__final">
            <div className="grid cf">
                <div className="grid__item one-sixth">
                <div className="home-extended-intro__flow__circle">
                    3
                </div>
                </div>
                <div className="grid__item five-sixths">
                <div className="home-extended-intro__flow__text">
                    <p className="no-mb">
                    Your site is instantly updated to reflect
                    your Facebook Page's content. You don't need
                    to do anything!
                    </p>
                </div>
                </div>
            </div>
            </li>
        </ol>
        </div>
    </div>
    </div>
</div>
<div className="pricing" id="pricing">
    <div className="container">
    <div className="grid">
        <div className="grid__item palm--one-whole lap--one-half desk--five-twelfths push--desk--one-twelfth">
        <div className="pricing__copy-content">
            <p>
            <span className="card-icon" />
            </p>
            <h2
            className="h1"
            style={{
                lineHeight: "1.35"
            }}>
            Ekko costs just <strong>£14.99</strong> a month
            </h2>
            <div className="faded--opacity mini big-mb">
            <p className="half-mb">
                Pay via Direct Debit with{" "}
                <a
                className="text-button"
                style={{
                    color: "#fff"
                }}
                href="https://gocardless.com/security/">
                GoCardless
                </a>{" "}
                (UK only).
            </p>
            <p className="half-mb">
                Card payments are also accepted globally through{" "}
                <a
                className="text-button"
                style={{
                    color: "#fff"
                }}
                href="https://stripe.com/global">
                Stripe
                </a>.
            </p>
            <p className="mini discount">
                We offer a{" "}
                <span className="bold">
                25% discount for life
                </span>{" "}
                for non-profit organisations, charities and
                students. <br />
                <a href="mailto:hello@ekko.site">Contact us</a> to
                get set up.
            </p>
            </div>
        </div>
        </div>
        <div className="grid__item palm--one-whole lap--one-half desk--one-third push--desk--one-sixth">
        <ul className="pricing__checklist">
            <li>Web hosting included</li>
            <li>
            Free{" "}
            <span data-tooltip="Including .com, .co.uk & .net">
                non-premium
            </span>{" "}
            domain
            </li>
            <li>Automatically updated content</li>
        </ul>
        </div>
    </div>
    </div>
</div> */
}
