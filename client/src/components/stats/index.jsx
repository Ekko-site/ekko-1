import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Text, Heading} from 'rebass'
import moment from 'moment'

import * as pageActions from './../../actions/page'

const style = {
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f5f7f9',
        borderRightWidth: 1,
        borderRightColor: 'rgba(72, 93, 117, 0.2)',
        borderStyle: 'solid',
        position: 'relative'
    },
    pageviews: {
        color: '#292e31',
        fontSize: '16px',
        fontWeight: 500
    },
    pageName: {
        color: '#292e31',
        fontSize: '16px',
        fontWeight: 500
    }
}

class Stats extends React.Component {

    componentDidMount() {
        this.props.pageActions.statsFetch()
    }

    render() {
        return <div className="page-frame app-container flex">
            <div style={style.sidebar} className="col-2 p2">
                <Heading mb={1} level={3} children="Pageviews" style={style.pageviews} className="bold" />
            </div>
            <div className="flex-auto p2">
                {
                    Object.keys(this.props.pageState.stats).map((pageId, key) => {
                        let pageName = this.props.pageState.stats[pageId][0].name
                        return <div className="mb3" key={key}>
                            <Heading level={4} mb={1} style={style.pageName}>
                                {pageName}
                            </Heading>
                            {
                                this.props.pageState.stats[pageId].sort((a, b) => a.month < b.month ? 1 : -1).map(record => {
                                    return <div className="mb1">
                                        <Text>
                                            {moment(record.month).format('MMM, YYYY')}: <span className="bold">{record.count}</span>
                                        </Text>
                                    </div>
                                })
                            }
                        </div>
                    })
                }
                {
                    (!Object.keys(this.props.pageState.stats).length) && (
                        <p>There aren't any sites in your account</p>
                    )
                }
            </div>
        </div>
    }
}

Stats.propTypes = {
    pageActions: PropTypes.object.isRequired,
    pageState: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {pageState: state.pageState}
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)
