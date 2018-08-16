import React from "react";
import PropTypes from "prop-types";
import Link from "redux-first-router-link";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Slider from "react-slick";
import Helmet from "react-helmet";
import YouTube from "react-youtube";

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
          title="Ekko - Always up-to-date marketing for your business"
          meta={[
            {
              name: "description",
              content: `Ekko is a service that allows people to create websites using only their Facebook Page. They can download it instantly and host it themselves, or we host the website and update the content every time they update their Facebook Page. There's no HTML or CSS to worry about, users can pick from a great selection of themes for their website. In 45 seconds, you can sign up and have your site online, and never have to touch it again.`
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
                Always up-to-date{" "}
                <span className="home-intro__headline__create-website">
                  marketing
                </span>{" "}
                for{" "}
                <span className="home-intro__headline__fb-page">
                  your business
                </span>
                <p className="main-cta animated-faster no-mb">
                  <Link to="/sign-up" className="butt butt--big">
                    Start Your Free Trial
                  </Link>
                </p>
              </h1>
            </div>
          </div>
        </div>
        <div className="home-extended-intro cf" id="learn-more">
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
            </div>
          </div>
        </div>
        <div className="pricing" id="pricing">
          <div className="container">
            <div className="grid">
              <div className="grid__item palm--one-whole desk--one-half">
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
                            Update your Facebook page — whether that’s a new
                            status, biography, a photo, or simply new opening
                            hours.
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
                            Facebook informs Ekko of this update and we fetch
                            your latest Page content.
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
                            Your site content is instantly updated to reflect
                            your Facebook Page's content. You don't need to do a
                            thing!
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="grid__item palm--one-whole desk--one-half push--one-twelfth">
                <div className="pricing__copy-content">
                  <p>
                    <span className="card-icon" />
                  </p>
                  <h2
                    className="h1"
                    style={{
                      lineHeight: "1.35"
                    }}>
                    Just <strong>&#36;9</strong> a month
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="no-technical">
          <div className="container">
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
        <div className="just-works cf">
          <div className="just-works__bg-area">
            <div className="just-works__slide just-works__slide--1">
              <span>Your Facebook content&hellip;</span>
            </div>
            <div className="just-works__slide just-works__slide--2">
              <span>&hellip;transformed into a website</span>
            </div>
          </div>
          <div className="container">
            <div className="grid">
              <div className="grid__item palm--one-whole lap--one-half desk--one-third just-works__copy">
                <h3 className="h2 big-mb raspberry">
                  Nothing to learn, it just
                  <span className="italic">&hellip;works</span>
                </h3>
                <h3 className="h2 big-mb just-works__subtitle" />
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
        <div className="testimonials">
          <div className="container">
            <div className="grid">
              <div className="grid__item one-whole desk--two-thirds push--desk--one-sixth">
                <blockquote className="large-quote center">
                  "Ekko's so easy to use and the generated sites look great. A
                  lot of businesses don't need a bespoke site with a complex
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
        <div className="final-cta-row">
          <div className="container">
            <div className="grid center">
              <div className="grid__item desk--one-half palm--one-whole lap--one-half">
                <div className="final-cta-row__block center">
                  <p className="emphasised">
                    Ekko's aim is to generate your new site in under a
                    minute&hellip;
                  </p>
                  <p className="emphasised">
                    <em>Ready?</em>
                  </p>
                  <p className="no-mb">
                    <Link to="/sign-up" className="butt butt--big butt--yellow">
                      Start Your Free Trial
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
