import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Link from 'redux-first-router-link'
import Helmet from 'react-helmet'

import * as authActions from '@/actions/auth'
import * as pageActions from '@/actions/page'
import * as themeActions from '@/actions/theme'

const sortThemes = (themes, activeTheme) => {
    return [
        activeTheme,
        ...themes.filter(t => t.id !== activeTheme.id)
    ].filter(Boolean)
}

class Themes extends React.Component {

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

    render() {
        const { current_user} = this.props.authState
        const { themes } = this.props.themesState
        const { pages, current, page_fetched, page_fetching, page_editing, toggling_page_online } = this.props.pageState
        const { switchCurrentPage, activateTheme, pagesRefresh, togglePageOnline, pageSync } = this.props.pageActions

        const page = current ? pages.find(p => p.id == current) : pages[0]
        if(!page){
            return <span></span>
        }
        const activeTheme = themes.find(theme => theme.id == page.ThemeId)

        const sortedThemes = sortThemes(themes, activeTheme)

        return (
            <div className="container themes huge-mb">
                <Helmet
                    title="Ekko's themes"
                    meta={[
                        {
                            name: 'description',
                            content: `Browse the collection of themes available for your Ekko site.`
                        }
                    ]}
                />
                <div className="grid">
                    <div className="grid__item palm--one-whole two-thirds">
                        <h1>Themes</h1>
                        <p className="big-mb">Browse the collection of themes available for your Ekko site. You can preview the design before setting anything live.</p>
                    </div>
                </div>
                <div className="grid">
                    {sortedThemes.map(theme => {
                        return <div className="grid__item palm--one-whole one-half" key={theme.id}>
                            <Link to={`/themes/${theme.id}`} className="themes__entry big-mb">
                                {
                                    !!(activeTheme.id == theme.id) && (
                                        <span className="themes__entry__active">Active theme</span>
                                    )
                                }
                                {
                                    !!(activeTheme.id !== theme.id) && (
                                        <span className="themes__entry__preview">Preview theme</span>
                                    )
                                }
                                <img src={`/dist/images/themes/${ theme.name }.png`} />
                                <h3 className="no-mb title">{ theme.name }</h3>
                                <p className="mini no-mb">{ theme.description }</p>
                            </Link>
                        </div>
                    })}
                    <div className="grid__item palm--one-whole one-half">
                        <div className="themes__entry center themes-cta">
                            <h3 className="title">More themes on their way...</h3>
                            <p className="big-mb">We work with a talented bunch of designers to create stylish and fresh themes for your website.</p>
                            <p className="mini">Have something specific in mind?</p>
                            <a className="butt butt--positive" href="mailto:support@ekko.site?subject=Themes">Chat with us</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Themes.propTypes = {
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
        themeActions: bindActionCreators(themeActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Themes)
