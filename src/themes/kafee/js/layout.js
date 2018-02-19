import React from 'react'
import moment from 'moment'
import Linkify from 'react-linkify'

const API_KEY = 'AIzaSyCPuOwTgswye73SH5wa_5mlCgOYorCR3fY'

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

        const { about, cover, picture, name, location = {}, hours = {}, call_to_actions, events = [], posts = [], phone, photos, description, screennames, emails, id } = this.props.doc.data

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

        const showMap = location.street
        const showAbout = description
        const showPosts = !!(posts.length)
        const showHours = !!(Object.keys(hours).length)
        const showLocation = !!(Object.keys(location).length)
        const showEvents = !!(events.length)

        let tel = phone && !phone.match(/<<not-applicable>>/i) ? phone : null

        return (
            <div className="container mx-auto">
                <style>
                    @import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700|Playfair+Display:700);
                </style>
                <div className="intro relative" style={style.cover}>
                    <div className="overlay absolute"></div>
                    <div className="intro-content mx-auto p4">
                        <div className="navigation caps flex">
                            <ul className="flex list-reset flex-auto bold">
                                {showAbout && (
                                    <li><a href="#about">about</a></li>
                                )}
                                {showEvents && (
                                    <li><a href="#events">events</a></li>
                                )}
                                {showPosts && (
                                    <li><a href="#posts">latest posts</a></li>
                                )}
                                {showHours && (
                                    <li><a href="#contact">opening times</a></li>
                                )}
                                {showMap && (
                                    <li><a href="#map">getting here</a></li>
                                )}
                                {showLocation && (
                                    <li><a href="#contact">contact</a></li>
                                )}
                            </ul>
                            {
                                tel && (
                                    <p className="phone right-align">call: <a href={`tel:${tel}`}>{ tel }</a></p>
                                )
                            }
                        </div>
                        <div className="h100 flex flex-column justify-center">
                            <h1 className="name max-width-3 mb3 title">
                                {name}
                            </h1>
                            <p className="about-text max-width-2">
                                <Linkify>{about}</Linkify>
                            </p>
                        </div>
                    </div>
                </div>
                {showAbout && (
                    <div className="about p4" id="about">
                        <h2 className="center about-title mb4">About</h2>
                        <p className="description-text max-width-3 mx-auto align-left">
                            {description}
                        </p>
                    </div>
                )}
                {
                    showEvents && (
                        <div className="events p4" id="events">
                            <h2 className="center events-title mb4">Events</h2>
                            {
                                Array.isArray(events) && (
                                    <div className="events-list flex justify-center">
                                        {
                                            events.map(event => {
                                                return <div className={`col-${events.length > 1 ? '4' : '12'} center event`}>
                                                    <p className="event-time mb2 caps">{ moment(event.start_time).format('dddd, Do MMMM YYYY [at] H:mm') }</p>
                                                    <h3 className="event-title mb2">{ event.name }</h3>
                                                    <p className="event-description italic mb3 max-width-3 mx-auto"><Linkify>{ event.description }</Linkify></p>
                                                    <a className="event-fb-btn inline-block caps text-decoration-none py1 px3 bold" href={`https://facebook.com/${event.id}`}>View on Facebook</a>
                                                </div>
                                            })
                                        }
                                    </div>
                                )
                            }
                        </div>
                    )
                }
                {
                    showPosts && (
                        <div className="posts pt4" id="posts">
                            <h2 className="center posts-title mb4">Latest Posts</h2>
                            <div className="flex flex-wrap">
                                {
                                    posts.map((post, index) => {
                                        const postId = post.id.match(/_/) ? post.id.split('_').pop() : null
                                        const postURL = postId ? `https://facebook.com/${id}/posts/${postId}` : `https://facebook.com/${id}`
                                        const textWidth = !post.full_picture ? '100%' : null
                                        const text = <div className="post-square center post-content flex items-center flex-column justify-center" style={!post.full_picture ? {
                                            width: textWidth
                                        } : {}}>
                                            <p className="post-message px2 mb2">"<Linkify>{ post.message }</Linkify>"</p>
                                            <p className="post-created caps mb2">{ moment(post.created_time).fromNow() }</p>
                                            <a href={postURL}>{
                                                <FacebookIcon colour />
                                            }</a>
                                        </div>
                                        const img = post.full_picture ? <div className="post-square post-image flex justify-center items-center">
                                            <img className="" src={ post.full_picture } alt=""/>
                                        </div> : null
                                        return <div className="flex col-6 post">
                                            {
                                                ([2,3,6,7].indexOf(index) === -1) ? [img, text] : [text, img]
                                            }
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    )
                }
                {
                    (showMap) && (
                        <div className="map" id="map">
                            <iframe
                                src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${location.street || ''}, ${location.city}, ${location.zip}`} frameBorder="0" />
                        </div>
                    )
                }
                <div className="contact flex mx-auto relative py4" id="contact" style={{
                    marginTop: showMap ? '-200px' : 0
                }}>
                    <div className="col-6 mx4 address">
                        {showLocation && (
                            <h2 className="address-title mb2 title mt2">
                                {(location.city) && (
                                    <span>{ location.city }, { location.country }</span>
                                )}
                                {(!location.street) && (
                                    <span>{ location.country }</span>
                                )}
                            </h2>
                        )}
                        {showLocation && (
                            <p className="mb3 address-one">{
                                [location.street, location.city, location.country, location.zip].filter(Boolean).join(', ')
                            }</p>
                        )}
                        {
                            emails && (
                                <p>email: {emails.map(email => <a className="bold text-decoration-none" href={`mailto:${email}`}>{ email }</a>)}</p>
                            )
                        }
                    </div>
                    <div className="col-6 mx4 contact-details">
                        {tel && (
                            <h2 className="address-phone mb2 title">{ tel }</h2>
                        )}
                        <div className="flex opening-times">
                            {showHours && ([
                                <p className="mr3 bold">Opening Times</p>,
                                <ul className="list-reset">
                                    <li>Monday <span className="bold right pl2">{hours.mon_1_open} - {hours.mon_1_close}</span></li>
                                    <li>Tuesday <span className="bold right pl2">{hours.tue_1_open} - {hours.tue_1_close}</span></li>
                                    <li>Wednesday <span className="bold right pl2">{hours.wed_1_open} - {hours.wed_1_close}</span></li>
                                    <li>Thursday <span className="bold right pl2">{hours.thu_1_open} - {hours.thu_1_close}</span></li>
                                    <li>Friday <span className="bold right pl2">{hours.fri_1_open} - {hours.fri_1_close}</span></li>
                                    <li>Saturday <span className="bold right pl2">{hours.sat_1_open} - {hours.sat_1_close}</span></li>
                                    <li>Sunday <span className="bold right pl2">{hours.sun_1_open} - {hours.sun_1_close}</span></li>
                                </ul>
                            ])}
                        </div>
                    </div>
                </div>
                <footer className="center py4">
                    <p className="mb2">{ name }, {new Date().getFullYear()}</p>
                    <div className="screenames flex items-baseline justify-center links">
                        {
                            (screennames || []).filter(s => ['Instagram', 'Twitter'].indexOf(s.service_name) > -1).concat([{
                                service_name: 'Facebook',
                                value: id
                            }]).map(s => {
                                const IconComponent = iconComponents[`${s.service_name}`]
                                return <a href={`http://${s.service_name.toLowerCase()}.com/${s.value}`} className="inline-flex items-center mx1 screenname-btn">
                                    <span className={`screenname-icon ml1 ${s.service_name.toLowerCase()}-icon`}>
                                        {
                                            IconComponent
                                        }
                                    </span>
                                </a>
                            })
                        }
                    </div>
                </footer>
            </div>
        )
    }
}

export default Junipero
