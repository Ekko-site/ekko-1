import React from 'react'
import Link from 'redux-first-router-link'

import { mrEkoImage } from '@/etc/images'

class FourOhFour extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showEko: false,
            keysEntered: ''
        }
    }
    componentDidMount() {
        document.addEventListener('keypress', this.handleKeyUp)
    }
    componentWillUnmount() {
        document.removeEventListener('keypress', this.handleKeyUp)
    }
    handleKeyUp = event => {
        const charCode = event.keyCode || event.which
        const char = String.fromCharCode(charCode)
        this.setState({
            keysEntered: this.state.keysEntered + char
        }, () => {
            if(this.state.keysEntered.match(/4815162342/)) {
                this.setState({
                    showEko: true,
                    keysEntered: ''
                })
                document.removeEventListener('keypress', this.handleKeyUp)
            }
        })
    }
    render() {
        return <div className="container">
            <div className="grid">
                <div className="grid__item">
                    <h2>You seem a little....LOST.</h2>
                    <p>Head back to the <Link to="/">homepage</Link>, or if you've already logged in, try heading to your <Link to="/dashboard">Ekko Dashboard</Link>.</p>
                    {(this.state.showEko) && (
                        <img style={{
                            position: 'absolute',
                            bottom: 0,
                            left: '20px',
                            zIndex: 10
                        }} src={mrEkoImage} key={mrEkoImage} alt="" />
                    )}
                </div>
            </div>
        </div>
    }
}

export default FourOhFour
