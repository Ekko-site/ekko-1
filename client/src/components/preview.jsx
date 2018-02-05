import React from 'react'
import BrowserWindow from './browser-window.jsx'
import TwitterIcon from './dashboard/twitter'
import FacebookIcon from './dashboard/facebook'

const ekkoRenderer = require('ekko-renderer')
const config = process.env

const getPageURLShare = url => {
    return <div className="cf share-url">
        <span className="mini faded">Website URL:</span>
        <input className="share-url-input" type="text" readOnly value={ url } onFocus={e => e.target.select()} />
        <div className="share-networks">
            <p className="mini faded share-networks-prefix">Share your creation:</p>
            <a target="_BLANK" href={`https://twitter.com/intent/tweet?text=Check out my website&url=${ url }`}>
                <TwitterIcon />
            </a>
            <a className="share-networks-fb" target="_BLANK" href={`https://www.facebook.com/sharer/sharer.php?u=${ url }`}>
                <FacebookIcon />
            </a>
        </div>
    </div>
}

const Preview = ({ page, theme, url }) => {
    return (
        <div className="dash-preview-wrap">
            {url && getPageURLShare(url)}
            <iframe className="preview-iframe" srcDoc={ekkoRenderer(config.NODE_ENV, {
                doc: page,
                theme: theme
            }, null, true)}></iframe>
        </div>
    )
}

export default Preview
