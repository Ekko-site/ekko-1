import React from "react";
import moment from "moment";
import Helmet from "react-helmet";

import {
  themeSnapshotImage,
  themeBoutiqueImage,
  themeFunkImage,
  themeKendrickImage,
  themeKafeeImage
} from "@/etc/images";

const benYearStarted = "2009";
const benDuration = () => moment().diff(moment(benYearStarted, "Y"), "years");

const About = () => {
  return (
    <div>
      <Helmet
        title="Meet the Ekko team"
        meta={[
          {
            name: "description",
            content: `A small, friendly team working to make your business life easier.`
          }
        ]}
      />
      <div className="about-header">
        <h1 className="h1 headline">Hey, we're Ekko.</h1>
        <p>A small, friendly team working to make your business life easier.</p>
      </div>
      <div className="container about-content">
        <div className="grid">
          <div className="grid__item one-whole">
            <h2 className="center">Team</h2>
            <hr className="primary" />
            <div className="founders">
              <div className="founder">
                <div className="founder-media">
                  <div className="avatar" id="founder-ben" />
                  <div className="founder-media-body">
                    <h3>Ben</h3>
                    <p>Founder</p>
                  </div>
                </div>
                <p className="faded">
                  "I've been building websites, amongst other software, for{" "}
                  {benDuration()} years now, so it made sense for me to build
                  software that builds other people's websites and make it all
                  super easy."
                </p>
                <div className="founder-connect">
                  <p>
                    👉
                    <a href="mailto:ben@ekko.site">Email</a>
                    <a href="http://twitter.com/ben_howdle">Twitter</a>
                    <a href="https://blog.ekko.site/@benhowdle">Blog</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-contributors">
        <div className="container">
          <div className="grid">
            <div className="grid__item one-whole">
              <h2 className="center">Contributors</h2>
              <p className="center">
                We work with a talented bunch of designers to create elegant
                themes for your content.
              </p>
              <hr className="primary" />
              <div className="contributors founders">
                <div className="founder">
                  <div className="founder-media">
                    <div className="avatar" id="founder-luke" />
                    <div className="founder-media-body">
                      <h3>Luke Jones</h3>
                      <p>Designer</p>
                    </div>
                  </div>
                  <div className="contributors-themes">
                    <div
                      className="themes-contributors-wrap"
                      data-theme-name="Snapshot">
                      <img src={themeSnapshotImage} alt="" />
                    </div>
                    <div
                      className="themes-contributors-wrap"
                      data-theme-name="Boutique">
                      <img src={themeBoutiqueImage} alt="" />
                    </div>
                  </div>
                  <div className="founder-connect">
                    <p>
                      👉
                      <a href="http://twitter.com/lukejones">Twitter</a>
                      <a href="https://instagram.com/lukejones">Instagram</a>
                      <a href="http://lukejones.me">Website</a>
                    </p>
                  </div>
                </div>
                <div className="founder">
                  <div className="founder-media">
                    <div className="avatar" id="founder-jack" />
                    <div className="founder-media-body">
                      <h3>Jack Smith</h3>
                      <p>Designer</p>
                    </div>
                  </div>
                  <div className="contributors-themes">
                    <div
                      className="themes-contributors-wrap"
                      data-theme-name="Funk">
                      <img src={themeFunkImage} alt="" />
                    </div>
                  </div>
                  <div className="founder-connect">
                    <p>
                      👉
                      <a href="http://twitter.com/jack_l_smith">Twitter</a>
                      <a href="https://instagram.com/jack_l_smith">Instagram</a>
                      <a href="http://jacksmith.is">Website</a>
                    </p>
                  </div>
                </div>
                <div className="founder">
                  <div className="founder-media">
                    <div className="avatar" id="founder-dan-gough" />
                    <div className="founder-media-body">
                      <h3>Dan Gough</h3>
                      <p>Designer</p>
                    </div>
                  </div>
                  <div className="contributors-themes">
                    <div
                      className="themes-contributors-wrap"
                      data-theme-name="Kendrick">
                      <img src={themeKendrickImage} alt="" />
                    </div>
                  </div>
                  <div className="founder-connect">
                    <p>
                      👉
                      <a href="http://twitter.com/dandgough">Twitter</a>
                      <a href="http://www.dangough.me/">Website</a>
                    </p>
                  </div>
                </div>
                <div className="founder">
                  <div className="founder-media">
                    <div className="avatar" id="founder-dan-edwards" />
                    <div className="founder-media-body">
                      <h3>Dan Edwards</h3>
                      <p>Designer</p>
                    </div>
                  </div>
                  <div className="contributors-themes">
                    <div
                      className="themes-contributors-wrap"
                      data-theme-name="Kafee">
                      <img src={themeKafeeImage} alt="" />
                    </div>
                  </div>
                  <div className="founder-connect">
                    <p>
                      👉
                      <a href="http://twitter.com/de">Twitter</a>
                      <a href="https://nodividestudio.com">Website</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
