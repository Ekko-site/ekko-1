import React from "react";
import PropTypes from "prop-types";
import Link from "redux-first-router-link";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Slider from "react-slick";
import Helmet from "react-helmet";

import * as authActions from "@/actions/auth";
import Mailchimp from "@/components/mailchimp";
import HomepagePreview from "@/components/homepage-preview";
import homepageInit from "@/home";

import {
  loaderImage,
  fbCircleImage,
  triangleImage,
  bigCircleImage,
  testimonialMelissaImage
} from "@/etc/images";

const sliderSettings = {
  dots: false,
  arrows: false,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  useCSS: true
};

class Home extends React.Component {
  componentDidMount() {
    homepageInit();
  }
  render() {
    return (
      <div>
        <Helmet
          title="Ekko - Create your business website in seconds, using your Facebook page"
          meta={[
            {
              name: "description",
              content: `Ekko is a service that allows people to create business websites using only their Facebook Page. Once they connect their Facebook Page to Ekko, we host the website and update the content every time they update their Facebook Page. There's no HTML or CSS to worry about, users can pick from a great selection of themes for their website. In 45 seconds, you can sign up and have your site online, and never have to touch it again. We offer free domains with annual plans, with SSL & WHOIS privacy included`
            }
          ]}
        />
        <div className="home-intro container" id="home-intro">
          <div className="grid">
            <div className="grid__item one-whole desk--five-sixths push--desk--one-twelfth">
              <h1 className="headline center home-intro__headline">
                <span className="shape-wrapper animated">
                  <div className="fb-circle">
                    <img src={loaderImage} className="loader" />
                    <img
                      src={fbCircleImage}
                      className="fb-circle-img animated"
                    />
                  </div>
                  <img src={triangleImage} className="triangle animated" />
                  <img
                    src={bigCircleImage}
                    className="big-circle animated-slow"
                  />
                </span>
                Create your{" "}
                <span className="home-intro__headline__create-website">
                  business website
                </span>{" "}
                in seconds, using your{" "}
                <span className="home-intro__headline__fb-page">
                  Facebook page
                </span>
                <p className="main-cta animated-faster no-mb">
                  <Link to="/create" className="butt butt--big">
                    Create my website
                  </Link>
                </p>
              </h1>
            </div>
          </div>
        </div>
        <div className="testimonials">
          <div className="container">
            <div className="grid">
              <div className="grid__item one-whole desk--two-thirds push--desk--one-sixth">
                <blockquote className="large-quote center">
                  "Ekko's so easy to use and the site it generates looks great.
                  A lot of businesses don't need a bespoke site with a complex
                  CMS. I think they'd be much happier managing a simpler website
                  with Facebook, the 'CMS' they're familiar with."
                </blockquote>
                <p className="mini center">
                  <img
                    src={testimonialMelissaImage}
                    className="testimonial-row__img"
                  />
                  <a href="https://twitter.com/keizgoesboom">Melissa Keizer</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="just-works cf">
          <div className="just-works__bg-area">
            <div className="just-works__slide just-works__slide--1">
              <span>Your Facebook page&hellip;</span>
            </div>
            <div className="just-works__slide just-works__slide--2">
              <span>&hellip;transformed into a website</span>
            </div>
          </div>
          <div className="container">
            <div className="grid">
              <div className="grid__item palm--one-whole lap--one-half desk--one-third just-works__copy">
                <h2 className="h1 big-mb raspberry">It just works</h2>
                <h3 className="h2 big-mb just-works__subtitle">
                  Nothing to learn.<br />
                  Always up to date.
                </h3>
                <p>
                  As you make a change on your Facebook Page, or post a new
                  status, your website is instantly updated. No more out-of-date
                  content.
                </p>
                <p>
                  If you know how to use Facebook, you know how to use Ekko.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="no-technical">
          <div className="container">
            <div className="grid">
              <div className="grid__item palm--one-whole lap--one-whole desk--one-half">
                <h2 className="h1">No technical jargon</h2>
                <p>
                  We deal with the domains and the hosting and the code and the
                  DNS and the&hellip;
                </p>
              </div>
            </div>
            <div className="grid">
              <div className="grid__item palm--one-whole lap--five-sixths push--lap--one-twelfth desk--one-half push--desk--one-sixth">
                <div className="no-technical__designs">
                  <p className="half-mb">
                    <span className="brush-icon" />
                  </p>
                  <h3 className="h2">Beautiful designs ready to use</h3>
                  <p className="no-mb">
                    No prior design or code skills needed, we've got a selection
                    of beautiful themes that elegantly adapt to your content, on
                    any device.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="no-technical__slider">
            <div className="no-technical__slider__inner">
              <Slider {...sliderSettings}>
                {["snapshot", "kafee", "funk", "junipero"].map(theme => {
                  const themeImage = require(`../images/themes-slider/${theme}.png`);
                  const themeImageMobile = require(`../images/themes-slider/${theme}-mobile.png`);
                  return (
                    <div>
                      <span className="no-technical__slider__inner__chrome-wrap">
                        <img
                          src={themeImage}
                          className="no-technical__slider__inner__browser"
                        />
                        <img
                          src={themeImageMobile}
                          className="no-technical__slider__inner__iphone"
                        />
                      </span>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
        <div className="final-cta-row">
          <div className="container">
            <div className="grid">
              <div className="grid__item desk--one-half palm--one-whole lap--one-half">
                <h2 className="h3 faq-link">
                  Have any questions? Check our <Link to="/faq">FAQ</Link> page.
                </h2>
              </div>
              <div className="grid__item desk--one-half palm--one-whole lap--one-half">
                <div className="final-cta-row__block center">
                  <p className="emphasised">
                    Ekko's aim is to have your new site online in under a
                    minute.
                    <br />
                    <em>Ready?</em>
                  </p>
                  <p className="no-mb">
                    <Link to="/sign-up" className="butt butt--big butt--yellow">
                      Create my new website now
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  authActions: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    authState: state.authState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
