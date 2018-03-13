import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Form, Control } from "react-redux-form";
import YouTube from "react-youtube";

import FieldErrors from "@/components/forms/field-errors";
import FormErrors from "@/components/forms/form-errors";
import Loading from "@/components/loading";
import Preview from "@/components/preview";

import * as pageActions from "@/actions/page";

const config = process.env;

class Create extends React.Component {
  handleSubmit = fbPage => {
    return this.props.pageActions.pageFetchByFBURL(fbPage);
  };

  render() {
    const fetching = this.props.fbPageForm.fetching.value;
    const { fbUrlPage } = this.props;
    const pageUrl = `${config.REACT_APP_API_URL}/s/${fbUrlPage}?preview=true`;
    return (
      <div>
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
        {fbUrlPage && (
          <div className="container create-content">
            <div className="grid">
              <div className="grid__item one-whole" />
              <Preview url={pageUrl} />
            </div>
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
    pageActions: bindActionCreators(pageActions, dispatch)
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
