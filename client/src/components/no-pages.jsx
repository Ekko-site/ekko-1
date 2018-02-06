import React from 'react'
import PropTypes from 'prop-types'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Link from 'redux-first-router-link'

import * as authActions from './../actions/auth'

import Loading from './loading.jsx'

const FB_CREATE_URL = 'https://www.facebook.com/pages/create/'

const windowCreator = (url, title, width, height) => {
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    const targetPop = window.open(url, title, `toolbar=no, location=no, directories=no,
status=no, menubar=no, scrollbars=YES, resizable=YES, copyhistory=no, width=${width},
height=${height}, top=${top}, left=${left}`);
    return targetPop
}

class NoPages extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pageChecking: 3,
            creating: false,
            closed: false
        }
    }

    handleFBCreate = event => {
        event.preventDefault()
        const { facebookFetchPage } = this.props.authActions
        const win = windowCreator(FB_CREATE_URL, 'Create Facebook Page', 960, 600)
        const checkForPages = () => {
            if(win.closed && this.state.pageChecking == 0){
                clearInterval(checker)
                this.setState({
                    pageChecking: 3,
                    creating: false,
                    closed: true
                }, () => {
                    setTimeout(() => {
                        facebookFetchPage()
                    }, 3000)
                })
            }
            console.log('Creating FB Page, continuing countdown...')
            this.setState({
                pageChecking: ((this.state.pageChecking - 1) < 0) ? 3 : --(this.state.pageChecking)
            })
        }
        const checker = setInterval(checkForPages, 1000)
        this.setState({
            creating: true
        })
    }

    render() {
        const { facebookFetchPage } = this.props.authActions
        const { fetchingFacebookPage, fetchedFacebookPage } = this.props.authState
        return (
            <div className="huge-mb no-pages-grid">
                <div className="no-pages-left">
                    <h3>Oops! We couldn't find your Facebook Page.</h3>
                    <p className="mini">It's easy to make one 👉</p>
                    <p className="mini faded">We've even put together a <a target="_BLANK" href="https://blog.ekko.site/creating-a-good-facebook-page-557d5f1b16bf">handy guide</a>.</p>
                    <div className="trial-alert huge-mb">
                        <p className="half-mb trial-alert__stopwatch"><img src="/dist/images/stopwatch.svg" /></p>
                        <div className="no-mb">
                            <p><strong className="half-mb">Recently created a Facebook Page?</strong></p>
                            <p className="half-mb">Sometimes new pages don't appear right away. Not to worry!</p>
                            {this.state.creating && (
                                <span className="trial-alert__no-palm">We'll try to find your new page in <strong>{ this.state.pageChecking }</strong> seconds.</span>
                            )}
                            <p><a className="text-button" onClick={() => facebookFetchPage()}>Find them now</a>.</p>
                        </div>
                    </div>
                    <div>
                        <strong className="mini">Not seeing your pages?</strong>
                        <p className="mini faded">
                            Did you give Ekko the correct Facebook permissions? If not, head back to <Link className="text-button" to="/connect-to-facebook">re-connect with Facebook</Link>.
                        </p>
                    </div>
                </div>
                <div className="no-pages-right">
                    {fetchingFacebookPage && !fetchedFacebookPage && (
                        <Loading column>
                            <p className="faded">Finding your new page...</p>
                        </Loading>
                    )}
                    {!fetchingFacebookPage && this.state.closed && (
                        <div className="center">
                            <h3>You're all set!</h3>
                            <Loading column>
                                <p className="faded">Finding your new page...</p>
                            </Loading>
                        </div>
                    )}
                    {(!fetchingFacebookPage && !this.state.closed) && (
                        <a className="butt butt--fb butt--big" onClick={this.handleFBCreate}>Create your Facebook Page</a>
                    )}
                </div>
            </div>
        )
    }
}

NoPages.propTypes = {
    authActions: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        authState: state.authState
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoPages)
