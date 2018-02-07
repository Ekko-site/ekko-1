import React from 'react'
import FacebookConnection from '@/components/facebook-connection'
import Loading from '@/components/loading'
import Icon from '@/components/icon'

const config = process.env
const $ = window.$ || null

const exampleSites = [
    {
        name: 'Melissa Keizer Photography',
        id: 1677885149094555
    }, {
        name: 'Espressini',
        id: 183329475082348
    }, {
        name: 'Girl With A Camera',
        id: 114401115317123
    }
]

class HomepagePreview extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activePage: null,
      example: false,
      showExampleSites: false
    }
  }

  handleModalClick(page, example){
    let theme = 2
    const exampleSite = exampleSites.find(e => e.id == page.id)
    if(exampleSite && exampleSite.name == 'Girl With A Camera') {
        theme = 7
    }
    if(exampleSite && exampleSite.name == 'Melissa Keizer Photography') {
        theme = 4
    }
    if(exampleSite && exampleSite.name == 'Espressini') {
        theme = 8
    }
    let url = `${config.SITES_URL}${page.id}/preview?theme=${theme}`
    if(window.innerWidth < 600){
        return window.open(url)
    }
    this.setState({
      activePage: url,
      example: typeof example == 'undefined' ? false : true
    }, () => {
      $ && $('body').addClass("iframe-modal-active");
    })
  }

  makeExampleLinks = () => {
      return exampleSites.map(example => {
          return <a href="#" onClick={e => {
              e.preventDefault()
              this.handleModalClick({id: example.id}, true)
            }} className="launch-iframe-modal see-it-in-action__fb-link cf">
            <span className="see-it-in-action__fb-link__img"></span>
            <span className="see-it-in-action__fb-link__text">{ example.name }</span>
          </a>
      })
  }

  render() {
    const { authState, authActions } = this.props
    let fetchedNoPages = !authState.facebookPages.length && authState.fetchedFacebookPage && !authState.fetchingFacebookPage
    return <div>
        {(authState.fetchingFacebookPage) && (
            <Loading />
        )}
        {(!!authState.facebookPages.length && !authState.fetchingFacebookPage || this.state.example) && (
            <div className="see-it-in-action__stage-2">
              <div className="modal-wrap modal-wrap--ekko-preview">
                <div className="modal-clicker"></div>
                <span className="modal-close"></span>
                <div className="modal modal--iframe">
                  <iframe src={this.state.activePage} height=""></iframe>
                </div>
              </div>
              {
                authState.facebookPages.map((page, index) => {
                    return <a href="#" onClick={e => {
                        e.preventDefault()
                        this.handleModalClick(page)
                      }} className="launch-iframe-modal see-it-in-action__fb-link cf">
                      <span className="see-it-in-action__fb-link__img"></span>
                      <span className="see-it-in-action__fb-link__text">{ page.name }</span>
                    </a>
                })
              }
            </div>
        )}
        {(fetchedNoPages) && (
            <div>
                <h4 className="h4 mb2">Oh no, we couldn't find any Facebook Pages in your account!</h4>
                <p className="mb4">Feel free to <a href="https://www.facebook.com/pages/create/?ref_type=logout_gear">Create a Page on Facebook</a> or try a different Facebook account below</p>
            </div>
        )}
        {(this.state.showExampleSites) && this.makeExampleLinks()}
        {(!authState.facebookPages.length && !authState.fetchingFacebookPage && !this.state.showExampleSites) && (
            <div>
              <div className="see-it-in-action__stage-1">
                <p className="emphasised">You can check out what your Ekko website could look like by logging into Facebook, and selecting one of your pages. It’s like magic.</p>
              </div>
                <p>
                  <FacebookConnection cssClass='butt butt--big butt--fb see-it-in-action-activate' callback={res => authActions.facebookFetchPage(res, {
                      fromHomepage: true
                  })} />
                </p>
                <p>Or check out some <span onClick={() => {
                    this.setState({
                        showExampleSites: true
                    })
                }} className="text-button">example sites</span></p>
            </div>
        )}
    </div>

  }
}

export default HomepagePreview
