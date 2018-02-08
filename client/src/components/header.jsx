import React from 'react'
import Link from 'redux-first-router-link'

import { headerLogoMarkImage, headerLogoTextImage } from '@/etc/images'

const onSignUp = path => path == '/sign-up'

const Header = ({ onHomepage, loggedIn, path }) => {
    return <header className={`site-header cf ${!onHomepage ? 'big-mb static': ''}`}>
        <div className="container">
            <Link to="/" className="site-logo-link">
                <img src={headerLogoMarkImage} className="site-logo-link__logomark animated-faster" />
                <img src={headerLogoTextImage} className="site-logo-link__img" />
            </Link>
            <nav className="site-header__nav">
                <ul>
                    {(onHomepage) && (
                        <li><a href="#home-intro" className="site-header__back">Back to top</a></li>
                    )}
                    {(onHomepage && !loggedIn) && (
                        <li><a href="#pricing">Pricing</a></li>
                    )}
                    <Link to="/about">Team</Link>
                    {(!loggedIn) && (
                        <li className="sep-li"><Link to="/login">Log in</Link><span></span></li>
                    )}
                    {(loggedIn) && (
                        <li className="sep-li"><Link to="/dashboard">Dashboard</Link><span></span></li>
                    )}
                    {(onHomepage && !loggedIn) && (
                        <li><Link to="/sign-up" className="site-header__nav__focus">Sign up</Link></li>
                    )}
                    {(!onHomepage && !onSignUp(path)) && (
                        <Link to="/sign-up">Sign up</Link>
                    )}
                </ul>
            </nav>
        </div>
    </header>
}

export default Header
