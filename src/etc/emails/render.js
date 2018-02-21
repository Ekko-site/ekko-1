import React from 'react'
import ReactHTMLEmail, { Email, Box, Item, Span, A, Image, renderEmail } from 'react-html-email'

// ReactHTMLEmail.injectReactEmailAttributes()

const textStyles = {
    fontSize: 16
}

const styles = {
    lineHeight: '1.65',
    fontFamily: 'Helvetica Neue, Helvetica, sans-serif',
    color: 'rgb(85,85,86)'
}

const titleStyle = {
    color: '#DA4177',
    fontSize: '20px',
    marginBottom: '20px',
    fontWeight: 'bold',
    paddingTop: '20px'
}

const css = `
    body { line-height: 1.65; }
    a { font-family: sans-serif; color: #DA4177; font-weight: bold; }
    hr { background-color: #FFE952; height: 3px; border: none; margin: 40px 0; }
`.trim()

const emailHTML = ({ content, title }) => {
    return renderEmail(
            <Email title={title} headCSS={css}>
                <Item>
                    <Span style={{
                        ...titleStyle,
                        lineHeight: '1.8'
                    }}>{ title }</Span>
                    <Span {...textStyles} style={styles}>
                        <span dangerouslySetInnerHTML={{ __html: content }}></span>
                    </Span>
                    <Span {...textStyles} style={{
                        ...styles,
                        textAlign: 'left'
                    }}>
                        <p>&nbsp;</p>
                        <hr />
                        <Image src="https://ekko.site/dist/images/logo.jpg" style={{
                            float: 'left',
                            marginBottom: 10,
                            marginTop: 10
                        }} width={60} height={60} alt="Ekko" />
                        <p style={{
                            clear: 'both'
                        }}><strong>Ben Howdle</strong><br />
                        Founder<br />
                        Ekko</p>
                    </Span>
                    <Box>
                        <Item>
                            <A href="mailto:hello@ekko.site">hello@ekko.site</A>
                        </Item>
                        <Item style={{
                            marginBottom: '10px'
                        }}>
                            <A href="https://ekko.site">ekko.site</A>
                        </Item>
                        <Item>
                            <Span {...textStyles} style={styles}>Create your business website in seconds, using your Facebook page.</Span>
                        </Item>
                    </Box>
            </Item>
        </Email>
    )
}

export default emailHTML
