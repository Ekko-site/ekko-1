import React from 'react'

import { Heading, Text } from 'rebass'

const styles = {
    pageNameWrap: {
        background: '#e7edf3',
        borderBottomColor: '#bed3ea',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px'
    },
    pageName: {
        color: '#292e31',
        fontSize: '16px',
        fontWeight: 500
    },
    pageSwitch: {
        color: '#7a828d',
        fontSize: '12px',
        fontWeight: '500',
        marginTop: '5px',
        cursor: 'pointer'
    }
}

class Page extends React.Component {
    render() {
        let data = this.props.page.data || {}
        return (
            <div className="p2">
                {
                    this.props.pages.filter(page => page.id !== this.props.page.id).map(page => {
                        let data = page.data || {}
                        return <Text small level={5}>
                            <span onClick={this.props.switchCurrentPage.bind(this, page.id)}>{ data.name }</span>
                        </Text>
                    })
                }

            </div>
        )
    }
}

export default Page
