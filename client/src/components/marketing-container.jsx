import React from 'react'

import Header from '@/components/header'
import Footer from '@/components/footer'

const MarketingContainer = ({ children, onHomepage, loggedIn, path }) => {
    return <div>
        <Header onHomepage={onHomepage} loggedIn={loggedIn} path={path} />
        { children }
        <Footer onHomepage={onHomepage} />
    </div>
}

export default MarketingContainer
