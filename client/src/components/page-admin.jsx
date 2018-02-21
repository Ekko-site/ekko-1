import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as authActions from '@/actions/auth'
import * as pageActions from '@/actions/page'

import LastUpdated from '@/components/last-updated'
import Sync from '@/components/sync'
import Loading from '@/components/loading'
import domainHelpers from '@/etc/domain-helpers'

const config = process.env

const findPage = pageState => pageState.pages.find(p => p.id == pageState.current)

class PageAdmin extends React.Component {

    getSync(page, pageSync) {
        return <Sync page={page} pageSync={pageSync} />
    }

    getPageOnline(page, togglePageOnline, pageSync) {
        if(!page.subscribed_to_webhook){
            return this.getSync(page, pageSync)
        }
        return <p className="no-mb faded mini">
            <span className="inline-icon sync"></span> Last synced <LastUpdated page={page} /> — <span onClick={togglePageOnline.bind(this, page.id)} className="faded danger-hover text-link">Switch site offline?</span></p>
    }

    render() {
        const { pageState, pageActions, domainState, marginUnderPageAdmin } = this.props
        const { togglePageOnline, pageSync } = pageActions
        const { user_pages } = domainState
        const { page_fetching } = pageState
        let page = findPage(pageState)
        if(!page){
            return <span></span>
        }
        const pageUrl = user_pages.length && config.REACT_APP_NODE_ENV == 'production' ? domainHelpers.getDomain(page, user_pages) : `${config.REACT_APP_API_URL}/s/${page.facebookPageId}`

        return <header className={`dash-header ${marginUnderPageAdmin && 'big-mb'}`}>
            <div className="container cf">
                <div className="grid">
                    <div className="grid__item one-whole lap--one-half desk--one-half">
                        <h2 className="tiny-mb">{ page.data.name }</h2>
                        {(!page.online) && (
                            <p className='no-mb faded mini red'>
                                <span className="inline-icon sync"></span> Website offline
                            </p>
                        )}
                        {page.online && this.getPageOnline(page, togglePageOnline, pageSync)}
                    </div>
                    <div className="grid__item one-whole lap--one-half desk--one-half tr--lap tr--desk">
                        {
                            !page.online

                            ? <span onClick={togglePageOnline.bind(this, page.id)} className="butt butt--big butt--positive butt--view-site">Switch site online</span>

                            : [
                                <a href={pageUrl} target="_BLANK" className="butt butt--positive butt--view-site">View website <span className="inline-icon green-check no-mr"></span></a>,
                                page_fetching ? <Loading style={{
                                    float: 'right',
                                    position: 'relative',
                                    top: '8px'
                                }} /> : <span onClick={() => pageSync(page.facebookPageId)} className="butt butt--positive butt--sync-site">Sync with Facebook Page</span>
                            ]
                        }
                    </div>
                </div>
            </div>
        </header>
    }
}

PageAdmin.propTypes = {
    authActions: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired,
    pageState: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        authState: state.authState,
        pageState: state.pageState,
        domainState: state.domainState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageAdmin)
