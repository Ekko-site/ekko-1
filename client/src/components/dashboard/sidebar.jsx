import React from 'react'

import { Heading } from 'rebass'

import Page from './../page.jsx'
import ThemeLink from './theme-link.jsx'
import CurrentTheme from './current-theme.jsx'
import Online from './online.jsx'
import FacebookUser from './facebook-user.jsx'
import ViewSite from './view-site.jsx'
import Sync from './sync.jsx'
import SyncPages from './sync-pages.jsx'
import Controls from './controls.jsx'
import FreeTrial from './free-trial.jsx'
import EkkoButton from './../ekko-button.jsx'

const pageStyle = (pageId, currentPageId) => {
    return {
        background: (currentPageId === pageId) ? '#ffffff' : '#e7edf3',
        borderBottomColor: '#bed3ea',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        cursor: (currentPageId === pageId) ? 'initial' : 'pointer',
    }
}

class Sidebar extends React.Component {
    getPageContent(page) {
        return <div>
            <LastUpdated page={page} />
            {(this.props.current_user && this.props.current_user.facebookUserId) && (
                <FacebookUser facebookUserId={this.props.current_user.facebookUserId} />
            )}
            <div className="mb1 pt2" style={{
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: 'rgba(5,37,55,.19)'
            }}>
                <ViewSite page={page} />
            </div>
            <Online togglingPageOnline={this.props.togglingPageOnline} pageFetching={this.props.pageFetching}
            handleTogglePageOnline={this.props.handleTogglePageOnline} page={page} />
        </div>
    }
    render() {
        const currentPage = this.props.page

        return (
            <div style={styles.sidebar} className="col-2">
                {
                    (!this.props.current_user.full_user) && (
                        <FreeTrial user={this.props.current_user} />
                    )
                }
                {/* <div className="p2" style={{
                    borderBottomColor: '#bed3ea',
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '1px'
                }}>
                    <ThemeLink />
                    <SyncPages handleSyncClick={this.props.handlePagesRefresh} />
                </div> */}
                {
                    this.props.pages.map((page, key) => {
                        return (
                            <div className="p2" onClick={this.props.switchCurrentPage.bind(this, page.id)} key={key} style={pageStyle(page.id, currentPage.id)}>
                                <Heading level={3} children={page.data.name} style={{
                                    color: '#292e31',
                                    fontSize: '16px',
                                    fontWeight: (currentPage.id === page.id) ? 600 : 400
                                }} />
                                {(currentPage.id === page.id) && this.getPageContent(page)}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const styles = {
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f5f7f9',
        borderRightWidth: 1,
        borderRightColor: 'rgba(72, 93, 117, 0.2)',
        borderStyle: 'solid',
        position: 'relative'
    },
}

export default Sidebar
