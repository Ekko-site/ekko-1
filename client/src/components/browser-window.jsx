import React from 'react'

const BrowserWindow = ({ children, url = '' }) => {
    return (
        <div className="browser_wrapper">
            <div className="browser_header">
                <div className="cf">
                    <div className="button_wrapper cf">
                        <a className="previous button" href="#">
                            <span>Previous</span>
                        </a>
                        <a className="next button" href="#">
                            <span>Next</span>
                        </a>
                    </div>

                    <div className="address_bar">
                        <input readOnly value={!url ? 'Preview' : url.replace(/\?internal/, '')} onFocus={e => e.target.select()} style={{
                                width: '100%'
                            }} />
                    </div>
                </div>
            </div>

            <div className="browser_content">
                { children }
            </div>
        </div>
    )
}

export default BrowserWindow
