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

class Swiss extends React.Component {

    render() {

        const { about, cover, picture, name, location, hours = {}, call_to_actions, events, posts, phone, photos, description, screennames, emails, id } = this.props.doc.data

        let tel = phone && !phone.match(/<<not-applicable>>/i) ? phone : null

        const showHours = !!(Object.keys(hours).length)

        const descriptionElement = <div className="description mb3">
            <p>{ description }</p>
        </div>

        const avatar = <div className="avatar mr2 mb2">
            <img className="circle" src={picture.url} alt="" />
        </div>

        const nameParts = name.split(' ')
        let nameElement
        if(nameParts.length == 1) {
            nameElement = nameParts[0]
        } else if(nameParts.every(n => n.length == 1)){
            nameElement = nameParts.join('')
        } else {
            const middleIndex = Math.ceil(nameParts.length / 2)
            nameElement = nameParts.map((part, index) => {
                return <span style={{
                    color: index >= middleIndex ? '#000' : '#fff'
                }}>
                    {part}
                    <br />
                </span>
            })
        }

        return (
            <div className="container">
                <style>
                    @import url(https://fonts.googleapis.com/css?family=Arapey);
                </style>
                <div className="hero p3 flex flex-column">
                    <div className="flex flex-auto justify-between top-details">
                        <div className="flex contact">
                            {
                                avatar
                            }
                            <div className="emails mr2 mb2">
                                {emails && emails.length && (
                                    (emails || []).map(e => <a className="caps mr1" href={`mailto:${e}`}>{ e }</a>)
                                )}
                            </div>
                            {
                                tel && (
                                    <div className="phone"><a href={`tel:${tel}`}>{ tel }</a></div>
                                )
                            }
                        </div>
                        <div className="screenames flex">
                            {
                                (screennames || []).filter(s => ['Instagram', 'Twitter'].indexOf(s.service_name) > -1).concat([{
                                    service_name: 'Facebook',
                                    value: id
                                }]).map(s => {
                                    const IconComponent = iconComponents[`${s.service_name}`]
                                    return <a href={`http://${s.service_name.toLowerCase()}.com/${s.value}`} className="inline-flex items-center mx1 screenname-btn">
                                        <span className={`screenname-icon ${s.service_name.toLowerCase()}-icon`}>
                                            {
                                                IconComponent
                                            }
                                        </span>
                                    </a>
                                })
                            }
                        </div>
                    </div>
                    <div className="flex bottom-details">
                        <div className="page-name">
                            <h2 className="h1 right-align">{ nameElement }</h2>
                        </div>
                    </div>
                </div>
                <div className="flex p3 meta-details">
                    <div className="col-6 pr2">
                        <div className="about thick-border-bottom mb3 pb1">
                            <h3 className="caps h2">{ about }</h3>
                        </div>
                        <div className="flex flex-column pb4">
                            {(location) && (
                                <h3 className="h3 one-line-address mb1">
                                    {(location.street) && (
                                        <span>{ location.street }, { location.city }</span>
                                    )}
                                    {(!location.street) && (
                                        <span>{ location.city }</span>
                                    )}
                                </h3>
                            )}
                            {
                                descriptionElement
                            }
                            {showHours && (
                                <div className="opening-times mb1">
                                    <h5 className="h3 mb1">Opening Times</h5>
                                    <ul className="list-reset">
                                        <li>Monday <span className="right pl2">{hours.mon_1_open} - {hours.mon_1_close}</span></li>
                                        <li>Tuesday <span className="right pl2">{hours.tue_1_open} - {hours.tue_1_close}</span></li>
                                        <li>Wednesday <span className="right pl2">{hours.wed_1_open} - {hours.wed_1_close}</span></li>
                                        <li>Thursday <span className="right pl2">{hours.thu_1_open} - {hours.thu_1_close}</span></li>
                                        <li>Friday <span className="right pl2">{hours.fri_1_open} - {hours.fri_1_close}</span></li>
                                        <li>Saturday <span className="right pl2">{hours.sat_1_open} - {hours.sat_1_close}</span></li>
                                        <li>Sunday <span className="right pl2">{hours.sun_1_open} - {hours.sun_1_close}</span></li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Swiss
