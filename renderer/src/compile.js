import React from 'react'
import ReactDOMServer from 'react-dom/server'
import component from './views/page'

const renderFile = (env, options, cb, client) => {
    try {
        var markup = '<!DOCTYPE html>'
        markup += ReactDOMServer.renderToString(
            React.createElement(component, Object.assign({}, options, {
                env
            }))
        )
    } catch (e) {
        return client ? e : cb(e)
    }
    if (client) {
        return markup
    }
    cb(null, markup)
}

export default renderFile
