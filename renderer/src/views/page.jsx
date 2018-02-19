import React from 'react'
import DefaultLayout from './layouts/default'
import Themes from './themes/'
import CSS from './themes/css'
import clients from './themes/client'

class Page extends React.Component {
    render() {
        if(!this.props.doc){
            return <p>Site not found</p>
        }
        if(!this.props.theme){
            return <p>No theme selected!</p>
        }
        const Theme = Themes[this.props.theme.name]
        if(!Theme){
            return <p>Incorrect theme assigned!</p>
        }
        const clientEntry = clients[this.props.theme.name]
        return (
            <DefaultLayout
                title={this.props.doc.data.name}
                description={this.props.doc.data.about || this.props.doc.data.description} theme={this.props.theme.name}
                production={this.props.env == 'production'}
                css={CSS[this.props.theme.name]}
                clientJS={clientEntry}
                data={this.props.doc.data}
                freeTrial={this.props.freeTrial}
                analytics_code={this.props.doc.analytics_code}
                expired={this.props.expired}>
                <Theme {...this.props} />
            </DefaultLayout>
        )
    }
}

export default Page
