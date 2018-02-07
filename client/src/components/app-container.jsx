import React from 'react'

import Sidebar from '@/sidebar.jsx'
import PageAdmin from '@/page-admin.jsx'
import Footer from '@/footer.jsx'

const AppContainer = ({ children, user, marginUnderPageAdmin, logout }) => {
    return <div>
        <Sidebar user={user} logout={logout} />
        <div className="dash-main">
            <PageAdmin marginUnderPageAdmin={marginUnderPageAdmin} />
            { children }
            <Footer />
        </div>
    </div>
}
    
export default AppContainer
