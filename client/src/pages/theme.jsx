import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Link from 'redux-first-router-link'
import Helmet from 'react-helmet'

import * as authActions from './../../actions/auth'
import * as pageActions from './../../actions/page'
import * as themeActions from './../../actions/theme'

import Loading from './../loading.jsx'
import ekkoRenderer from 'ekko-renderer'

const config = process.env

class Theme extends React.Component {

    componentDidMount() {
        if(!this.props.themesState.themes.length){
            this.props.themeActions.themesFetch()
        }
        if(!this.props.pageState.pages.length && this.props.authState.current_user){
            this.props.pageActions.pagesFetch()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.authState.current_user && nextProps.authState.current_user && nextProps.authState.current_user.facebookUserId) {
            this.props.pageActions.pagesFetch()
        }
    }

    installTheme = (pageId, themeId) => {
        this.props.pageActions.activateTheme(pageId, themeId)
        this.props.pageActions.saveNewTheme(pageId)
    }

    render() {
        const { current_user } = this.props.authState
        const { params: { id } } = this.props
        const { themes } = this.props.themesState
        const theme = (themes || []).find(theme => theme.id == id)
        if(!theme){
            return <Loading />
        }

        const { pages, current, page_fetched, page_fetching, page_editing, toggling_page_online } = this.props.pageState
        const { switchCurrentPage, activateTheme, pagesRefresh, togglePageOnline, pageSync } = this.props.pageActions

        const page = current ? pages.find(p => p.id == current) : pages[0]
        const isCurrentTheme = (page && page.ThemeId) == theme.id

        return (
            <div className="container themes">
                <Helmet
                    title={`Ekko theme ${ theme.name }`}
                    meta={[
                        {
                            name: 'description',
                            content: theme.description
                        }
                    ]}
                />
                <div className="grid">
    				<div className="grid__item palm--one-whole">
    					<p className="no-mb progress-list">
    						<Link to="/themes" className="progress-list__current">Themes</Link>
    						<span className="divide">&#8594;</span>
    					</p>
    					<h1 className="title">{ theme.name }</h1>
    					<p>{ theme.description }</p>
                        {(!isCurrentTheme) && (
                            <p className="big-mb" onClick={() => this.installTheme(page.id, theme.id)}><span className="butt butt--yellow">Activate this theme</span></p>
                        )}
    					<h3 className="big-mb">A preview of this theme</h3>
                        <iframe className="preview-iframe" srcDoc={ekkoRenderer(config.NODE_ENV, {
                            doc: page,
                            theme: theme
                        }, null, true)}></iframe>
    				</div>
    			</div>
            </div>
        )
    }
}

Theme.propTypes = {
    authActions: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired,
    pageActions: PropTypes.object.isRequired,
    pageState: PropTypes.object.isRequired,
    themesState: PropTypes.object.isRequired,
    themeActions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        authState: state.authState,
        pageState: state.pageState,
        themesState: state.themesState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        pageActions: bindActionCreators(pageActions, dispatch),
        themeActions: bindActionCreators(themeActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Theme)
