import React from "react";
import { NavLink } from "redux-first-router-link";

import { headerLogoMarkImage, headerLogoTextImage } from "@/etc/images";

const onSignUp = path => path == "/sign-up";

const Header = ({ onHomepage, loggedIn, path }) => {
  return (
    <header className={`site-header cf ${!onHomepage ? "big-mb static" : ""}`}>
      <div className="container">
        <NavLink to="/" className="site-logo-link">
          <img
            src={headerLogoMarkImage}
            className="site-logo-link__logomark animated-faster"
          />
          <img src={headerLogoTextImage} className="site-logo-link__img" />
        </NavLink>
        <nav className="site-header__nav">
          <ul>
            {onHomepage && (
              <li>
                <a href="#home-intro" className="site-header__back">
                  Back to top
                </a>
              </li>
            )}
            {onHomepage &&
              !loggedIn && (
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
              )}
            <NavLink activeClassName="site-header__nav__focus" to="/about">
              Team
            </NavLink>
            {!loggedIn && (
              <li className="sep-li">
                <NavLink activeClassName="site-header__nav__focus" to="/login">
                  Log in
                </NavLink>
                <span />
              </li>
            )}
            {loggedIn && (
              <li className="sep-li">
                <NavLink
                  activeClassName="site-header__nav__focus"
                  to="/dashboard">
                  Dashboard
                </NavLink>
                <span />
              </li>
            )}
            {onHomepage &&
              !loggedIn && (
                <li>
                  <NavLink
                    activeClassName="site-header__nav__focus"
                    to="/sign-up"
                    className="site-header__nav__focus">
                    Sign up
                  </NavLink>
                </li>
              )}
            {!onHomepage &&
              !onSignUp(path) && (
                <NavLink
                  activeClassName="site-header__nav__focus"
                  to="/sign-up">
                  Sign up
                </NavLink>
              )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
