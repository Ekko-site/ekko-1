import React from 'react'

import Analytics from './../analytics'
import Expired from './../expired'

class DefaultLayout extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="description" content={this.props.description} />
                    <style type="text/css">
                        <span dangerouslySetInnerHTML={{ __html: `em{outline:none;}${this.props.css}` }}></span>
                    </style>
                    {
                        (this.props.analytics_code) && (
                            <Analytics analytics_code={this.props.analytics_code} />
                        )
                    }
                </head>
                <body>
                    <div id="root">
                        {this.props.children}
                    </div>
                    {
                        (this.props.freeTrial) && (
                            <div style={{
                                    color: 'white',
                                    textAlign: 'center',
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    backgroundColor: 'rgb(0, 140, 221)'
                                }}>
                                Powered by <a style={{
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }} href="https://ekko.site">Ekko</a>
                            </div>
                        )
                    }
                    {
                        (this.props.expired) && (
                            <Expired />
                        )
                    }
                    <script id="data" type="application/json" dangerouslySetInnerHTML={{
                        __html: JSON.stringify({doc: {
                            data: Object.keys(this.props.data).filter(k => k !== 'access_token').reduce((a, c) => {
                                return Object.assign({}, a, {
                                    [c]: this.props.data[c]
                                })
                            }, {})
                        }})
                    }}></script>
                    <script dangerouslySetInnerHTML={{
                        __html: this.props.clientJS
                    }}></script>
                </body>
            </html>
        )
    }
}

export default DefaultLayout
