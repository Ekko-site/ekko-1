import React from 'react'

class Analytics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            analytics_code: null
        }
    }
    render() {
        const { pages, current } = this.props
        if(!pages.length){
            return null
        }
        let page = pages.find(p => p.id == current)
        return <div className="center">
            <h4 className="h4">Analytics</h4>
            <input defaultValue={page.analytics_code} onChange={event => event.target.value && this.setState({ analytics_code: event.target.value })} />
            <button onClick={() => this.props.saveAnalytics(page.id, this.state.analytics_code)}>Save</button>
        </div>
    }
}

export default Analytics
