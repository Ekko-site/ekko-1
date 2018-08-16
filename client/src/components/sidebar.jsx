import React from "react";
import { NavLink } from "redux-first-router-link";

import freeTrial from "@/etc/out-of-free-trial";

import { logoImage, stopwatchImage } from "@/etc/images";

const getDayPeriod = () => {
  const today = new Date();
  const curHr = today.getHours();
  if (curHr < 12) {
    return "morning";
  } else if (curHr < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
};

const Sidebar = ({ user = {}, logout }) => {
  user = user || {};
  const { left } = freeTrial(user);
  return (
    <section className="dash-sidebar cf">
      <span className="dash-sidebar__intro">
        <div className="cf">
          <NavLink to="/" className="dash-sidebar__logo">
            <img src={logoImage} />
          </NavLink>
        </div>
        <p className="dash-sidebar__welcome faded mini">
          Good {getDayPeriod()} <span className="title">{user.firstName}</span>{" "}
          👋
        </p>
      </span>
      <nav className="dash-sidebar__nav">
        <ul>
          <li>
            <NavLink activeClassName="current" to="/dashboard">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="current" to="/themes">
              Themes
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="current" to="/settings">
              Settings
            </NavLink>
          </li>
          <li className="dash-sidebar__nav__logout">
            <span onClick={logout}>Log out</span>
          </li>
        </ul>
      </nav>
      <div className="cf" />
      {!user.full_user && (
        <div className="trial-alert">
          <p className="half-mb trial-alert__stopwatch">
            <img src={stopwatchImage} />
          </p>
          <p>
            <span className="trial-alert__no-palm">
              {left} days left in your free trial.
            </span>
          </p>
          <h4 className="no-mb">
            <NavLink to="/settings">Upgrade</NavLink> now.
          </h4>
        </div>
      )}
    </section>
  );
};

export default Sidebar;
