import React from 'react'

import Loading from '@/loading.jsx'

class PageChooser extends React.Component {

    componentDidMount() {
        !this.props.pages.length && this.props.facebookFetchPage()
    }

    outputPages(pages, onPageChoice) {
        return <div className="center grid__item one-whole desk--two-thirds push--desk--one-sixth">
            <h2 className="h2 left-align mb4">Pick one of your pages to use with Ekko</h2>
            {
                pages.map((page, index) => {
                    return <div className="launch-iframe-modal see-it-in-action__fb-link cf text-link" onClick={() => onPageChoice(page.id, page.access_token)}>
                      <span className="see-it-in-action__fb-link__img"></span>
                      <span className="see-it-in-action__fb-link__text">{ page.name }</span>
                    </div>
                })
            }
        </div>
    }

    render() {

        const { fetchingFacebookPage, pages = [], onPageChoice, facebookFetchPage, pageFetching } = this.props

        if(!fetchingFacebookPage && !pages.length){
            return <span></span>
        }

        return <div>
                {(fetchingFacebookPage || pageFetching) && (
                    <Loading column>
                        {pageFetching && (
                            <p>Setting up your new site in Ekko</p>
                        )}
                        {fetchingFacebookPage && (
                            <p>Fetching your information from Facebook!</p>
                        )}
                    </Loading>
                )}
                {(!fetchingFacebookPage && !pageFetching) && this.outputPages(pages, onPageChoice)}
        </div>
    }
}

export default PageChooser
