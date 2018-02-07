import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as authActions from '@/../actions/auth'
import * as pageActions from '@/../actions/page'

import PageChooser from '@/page-chooser.jsx'

const PickFacebookPage = ({ authActions, authState, pageActions, pageState }) => {
    const { facebookPages, fetchingFacebookPage } = authState
    const { page_fetching } = pageState
    const { pageFetch } = pageActions
    const { facebookFetchPage } = authActions
    return <div className="container huge-mb">
        <div className="grid">
            <PageChooser
                onPageChoice={pageFetch}
                fetchingFacebookPage={fetchingFacebookPage}
                pages={facebookPages}
                facebookFetchPage={facebookFetchPage}
                pageFetching={page_fetching}
            />
        </div>
    </div>
}

PickFacebookPage.propTypes = {
    authActions: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired,
    pageActions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        authState: state.authState,
        pageState: state.pageState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PickFacebookPage)
