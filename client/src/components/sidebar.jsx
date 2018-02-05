import React from 'react'

import { Link } from 'react-router'

import FreeTrial from './dashboard/free-trial.jsx'

const Sidebar = ({ user = {}, logout }) => {
    user = user || {}
    return <section className="dash-sidebar cf">
        <span className="dash-sidebar__intro">
            <div className="cf">
                <Link to="/" className="dash-sidebar__logo">
                    <img src="/dist/images/logo.svg" />
                </Link>
            </div>
            <p className="dash-sidebar__welcome faded mini">Good day <span className="title">{ user.firstName }</span> 👋🏽</p>
        </span>
        <nav className="dash-sidebar__nav">
            <ul>
                <li><Link activeClassName="current" to="/dashboard">Dashboard</Link></li>
                <li><Link activeClassName="current" to="/themes">Themes</Link></li>
                <li><Link activeClassName="current" to="/settings">Settings</Link></li>
                <li className="dash-sidebar__nav__logout"><span onClick={logout}>Log out</span></li>
            </ul>
        </nav>
        <div className="cf"></div>
        {(!user.full_user) && (
            <div className="trial-alert">
                <p className="half-mb trial-alert__stopwatch"><img src="/dist/images/stopwatch.svg" /></p>
                <p><span className="trial-alert__no-palm">Your website is currently in <strong>preview mode</strong>.</span></p>
                <p className="no-mb"><Link to= "/settings">Activate</Link> now.</p>
            </div>
        )}
    </section>
}

export default Sidebar
