import React from "react";

import Link from "redux-first-router-link";

import { footerLogoImage } from "@/etc/images";

const Footer = ({ onHomepage }) => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="grid">
          <div className="grid__item one-whole">
            <div className="cf">
              <div>
                <img src={footerLogoImage} className="site-footer__logo" />
              </div>
              <nav className="site-footer__nav">
                <ul>
                  <li className="site-footer__nav__email-wrap">
                    <a
                      href="mailto:hello@ekko.site"
                      data-tooltip="Open mail client">
                      hello@ekko.site
                    </a>
                  </li>
                  <li>
                    <a href="https://blog.ekko.site">Blog</a>
                  </li>
                  {/* <li>
                    <Link to="/terms">Terms</Link>
                  </li> */}
                  {/* <li><Link to="/faq">FAQ</Link></li> */}
                </ul>
              </nav>
              <a
                href="https://twitter.com/ekkosite"
                className="site-footer__twitter-link">
                @ekkosite
              </a>
              <a href="https://fb.me/ekkosite" className="site-footer__fb-link">
                Ekko
              </a>
            </div>
            <p className="site-footer__copyright">
              &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
