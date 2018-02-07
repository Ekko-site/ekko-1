import React from 'react'

import Header from '@/header.jsx'
import Footer from '@/footer.jsx'

const MarketingContainer = ({ children, onHomepage, loggedIn, path }) => {
    return <div>
        <Header onHomepage={onHomepage} loggedIn={loggedIn} path={path} />
        { children }
        <Footer onHomepage={onHomepage} />
    </div>
}

export default MarketingContainer
