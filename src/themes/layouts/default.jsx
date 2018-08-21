import React from "react";

const Expired = () => {
  return (
    <div className="paywall">
      <div className="paywall-inner">
        <h1>Free trial over!</h1>
        <p>
          Visit the <a href="https://ekko.site/dashboard">Ekko dashboard</a> to
          upgrade!
        </p>
      </div>
    </div>
  );
};

export default ({
  title,
  description,
  children,
  css,
  analytics_code,
  freeTrial,
  expired,
  data,
  clientJS
}) => {
  return (
    <html>
      <head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <style type="text/css">
          <span
            dangerouslySetInnerHTML={{ __html: `em{outline:none;}${css}` }}
          />
        </style>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .paywalled {
                overflow: hidden;
              }
              .paywall {
                position: fixed;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                top: 0;
                left: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
              }
              .paywall-inner {
                color: #fff;
                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
              }
              .paywall-inner p, .paywall-inner h1 {
                text-align: center;
              }
              .paywall-inner h1 {
                font-size: 48px;
              }
              .paywall-inner p {
                font-size: 24px;
              }
            `
          }}
        />
        {/* {
                    (analytics_code) && (
                        <Analytics analytics_code={analytics_code} />
                    )
                } */}
      </head>
      <body className={expired && "paywalled"}>
        <div id="root">{children}</div>
        {/* {
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
                */}
        {expired && <Expired />}
        <script
          id="data"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              doc: {
                data: Object.keys(data)
                  .filter(k => k !== "access_token")
                  .reduce((a, c) => {
                    return Object.assign({}, a, {
                      [c]: data[c]
                    });
                  }, {})
              }
            })
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: clientJS
          }}
        />
      </body>
    </html>
  );
};
