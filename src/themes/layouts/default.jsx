import React from 'react'

export default ({ title, description, children }) => {
    return (
        <html>
            <head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content={description} />
                <style type="text/css">
                    <span dangerouslySetInnerHTML={{ __html: `em{outline:none;}${css}` }}></span>
                </style>
                {
                    (analytics_code) && (
                        <Analytics analytics_code={analytics_code} />
                    )
                }
            </head>
            <body>
                <div id="root">
                    {children}
                </div>
                {
                    (freeTrial) && (
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
                    (expired) && (
                        <Expired />
                    )
                }
                {/* <script id="data" type="application/json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({doc: {
                        data: Object.keys(data).filter(k => k !== 'access_token').reduce((a, c) => {
                            return Object.assign({}, a, {
                                [c]: data[c]
                            })
                        }, {})
                    }})
                }}></script>
                <script dangerouslySetInnerHTML={{
                    __html: clientJS
                }}></script> */}
            </body>
        </html>
    )
}
