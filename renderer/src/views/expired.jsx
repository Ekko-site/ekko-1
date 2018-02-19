import React from 'react'

const fs = require('fs')
const path = require('path')

const logoImage = fs.readFileSync(path.join(__dirname, '..', 'images/logo-cut-out.png'))
const logoImageURI = new Buffer(logoImage).toString('base64')

const styles = {
    overlay: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.6)',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    button: {
        textDecoration: 'none',
        borderRadius: '40px',
        padding: '12px 22px',
        backgroundColor: '#DA4177',
        color: '#fff',
        transition: 'all 0.15s ease-out',
        margin: '20px auto',
        fontWeight: '500',
        display: 'inline-block'
    },
    mainButton: {
        margin: '40px auto',
        fontSize: '20px'
    },
    secondaryButton: {
        padding: '6px 22px',
        backgroundColor: '#fff',
        color: '#313131'
    },
    grid: {
        display: 'flex',
        marginTop: '80px',
        width: '100%',
        justifyContent: 'space-between'
    },
    heading: {
        margin: '30px auto 20px auto',
        textAlign: 'center',
        color: '#fff'
    },
    mainCTA: {
        textAlign: 'center'
    }
}

const css = `
    body {
        overflow: hidden;
        font-family: -apple-system,
               BlinkMacSystemFont,
               Segoe UI,
               Roboto,
               Oxygen,
               Ubuntu,
               Cantarell,
               Open Sans,
               Helvetica Neue,
               sans-serif !important;
    }
    .container {
        filter: blur(8px);
        transform: scale(1.1);
    }
    p {
        font: inherit !important;
        color: #fff !important;
    }
    a {
        color: inherit;
    }
    .expired-center {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100vh;
        z-index: 101;
        max-width: 720px;
        margin: 0 auto;
        font-size: 16px !important;
        padding: 40px;
    }
    .expired-logo {
        width: 64px;
        box-shadow: 0 15px 35px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.03);
    }
    @media (max-width: 600px) {
        .expired-grid {
            flex-direction: column !important;
            align-items: center;
        }
    }
    @media (max-height: 600px) {
        .expired-overlay {
            overflow-y: scroll;
            padding: 40px 0;
        }
    }
`

const Expired = () => {
    return <div>
        <style>
            {css}
        </style>
        <div style={styles.overlay} className="expired-overlay">
            <div className="expired-center">
                <img className="expired-logo" src={`data:image/png;base64,${logoImageURI}`} alt=""/>
                <h1 style={styles.heading}>Your Ekko free trial has ended.</h1>
                <div>
                    <div style={styles.mainCTA}>
                        <p>Get synced-up and online again now by upgrading your subscription.</p>
                        <a style={Object.assign({}, styles.button, styles.mainButton)} href="https://ekko.site/settings">Upgrade now</a>
                        <p>Need more time? <a href="mailto:support@ekko.site?subject=extend trial">Extend trial</a></p>
                    </div>
                </div>
                <div style={styles.grid} className="expired-grid">
                    <div style={styles.gridItem}>
                        <a style={Object.assign({}, styles.button, styles.secondaryButton)} href="https://blog.ekko.site">Read our blog</a>
                    </div>
                    <div style={styles.gridItem}>
                        <a style={Object.assign({}, styles.button, styles.secondaryButton)} href="https://ekko.site/themes">Browse themes</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Expired
