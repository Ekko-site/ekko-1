import React from 'react'
import moment from 'moment'
import Linkify from 'react-linkify'

import TwitterIcon from './twitter'
import InstagramIcon from './instagram'
import FacebookIcon from './facebook'

const iconComponents = {
    Twitter: <TwitterIcon />,
    Facebook: <FacebookIcon />,
    Instagram: <InstagramIcon />
}

class Junipero extends React.Component {

    render() {

        const { about, cover, picture, name, location, hours, call_to_actions, events, posts, phone, photos, description, screennames, emails, id } = this.props.doc.data

        const style = {}
        if(cover && cover.source) {
            style.cover = {
                backgroundImage: `url(${cover.source})`
            }
        } else {
            style.cover = {
                background: '#2C3437'
            }
        }

        return (
            <div style={style.cover} className="container">
                <style>
                    @import url(https://fonts.googleapis.com/css?family=Lato|PT+Serif);
                </style>
                <div className="bg-gradient"></div>
                <div className="inner-wrap max-width-3 mx-auto flex flex-column justify-center px2 py4">
                    <div className="avatar mb4 center">
                        <img className="circle" src={picture.url} alt="" />
                    </div>
                    <div className="page-name center mb1">
                        <h2 className="white h1">{ name }</h2>
                    </div>
                    <div className="about center mb4">
                        <h3 className="caps h3">{ about }</h3>
                    </div>
                    <div className="description center mb4">
                        <p>{ description }</p>
                    </div>
                    <div className="emails mb3 center">
                        {emails && emails.length && (
                            <p>Contact me at {
                                (emails || []).map(e => <a href={`mailto:${e}`}>{ e }</a>)
                            }</p>
                        )}
                    </div>
                    <div className="screenames flex items-baseline justify-center links">
                        {
                            (screennames || []).filter(s => ['Instagram', 'Twitter'].indexOf(s.service_name) > -1).concat([{
                                service_name: 'Facebook',
                                value: id
                            }]).map(s => {
                                const IconComponent = iconComponents[`${s.service_name}`]
                                return <a href={`http://${s.service_name.toLowerCase()}.com/${s.value}`} className="inline-flex items-center mx1 screenname-btn">
                                    {(s.service_name == 'Facebook') && (
                                        <span>{ name }</span>
                                    )}
                                    {(s.service_name !== 'Facebook') && (
                                        <span>@{ s.value }</span>
                                    )}
                                    <span className={`screenname-icon ml1 ${s.service_name.toLowerCase()}-icon`}>
                                        {
                                            IconComponent
                                        }
                                    </span>
                                </a>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Junipero
