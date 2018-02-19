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

export default class Standard extends React.Component {

    render() {

        const { about, cover, picture, name, location, hours, call_to_actions, events, posts, phone, photos, description, emails, id, screennames } = this.props.doc.data

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

        let tel = phone && !phone.match(/<<not-applicable>>/i) ? phone : null

        return (
            <div className="container">
                <header className="masthead">
                    <h1>{ name }</h1>
                    {(tel) && (
                        <nav>
                            <ul>
                                <li><a href={`tel:${tel}`}>{ tel }</a></li>
                            </ul>
                        </nav>
                    )}
                </header>
                <div className="cover-photo">
                    <div className="cover-photo--background" style={style.cover}></div>
                    <div className="cover-photo--content">
                        <img className="profile-picture" src={ picture.url } alt=""/>
                        <p>{ about }</p>
                        {(location) && (
                            <p className="sub-text">
                                {(location.street) && (
                                    <span>{ location.street }, { location.city }</span>
                                )}
                                {(!location.street) && (
                                    <span>{ location.city }</span>
                                )}
                            </p>
                        )}
                    </div>
                </div>
                {(hours || location || emails) && (
                    <aside className="info-sidebar">
                        {(hours) && (
                            <section>
                                <header><h1>Opening Hours</h1></header>
                                <ul className="list-reset hours">
                                    <li>Monday <span className="bold right pl2 hours-unit">{hours.mon_1_open} - {hours.mon_1_close}</span></li>
                                    <li>Tuesday <span className="bold right pl2 hours-unit">{hours.tue_1_open} - {hours.tue_1_close}</span></li>
                                    <li>Wednesday <span className="bold right pl2 hours-unit">{hours.wed_1_open} - {hours.wed_1_close}</span></li>
                                    <li>Thursday <span className="bold right pl2 hours-unit">{hours.thu_1_open} - {hours.thu_1_close}</span></li>
                                    <li>Friday <span className="bold right pl2 hours-unit">{hours.fri_1_open} - {hours.fri_1_close}</span></li>
                                    <li>Saturday <span className="bold right pl2 hours-unit">{hours.sat_1_open} - {hours.sat_1_close}</span></li>
                                    <li>Sunday <span className="bold right pl2 hours-unit">{hours.sun_1_open} - {hours.sun_1_close}</span></li>
                                </ul>
                            </section>
                        )}
                        {(emails) && (
                            <section>
                                <header><h1>Email address</h1></header>
                                {emails.map(email => <p><a href={`mailto:${email}`}>{ email }</a></p>)}
                            </section>
                        )}
                        {(location) && (
                            <section>
                                <header><h1>Address</h1></header>
                                <p>{
                                    [location.street, location.city, location.country, location.zip].filter(Boolean).join(', ')
                                }</p>
                                {
                                    (location.street) && (
                                        <iframe
                                            className="ml1" src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${location.street || ''}, ${location.city}, ${location.zip}`} frameBorder="0"></iframe>
                                    )
                                }
                            </section>
                        )}
                    </aside>
                )}
                <section className="content">
                    <div className="intro">
                        <header>
                            <h1>About { name }</h1>
                        </header>
                        <p>{ description }</p>
                    </div>
                    {
                        (!!events && !!events.length) && (
                            <div className="events">
                                <header><h1>Events</h1></header>
                                {
                                    (events && events.map(event => {
                                        return <article>
                                            <img src={ event.cover.source } alt="" />
                                            <h2>{ event.name }</h2>
                                            <p className="meta-info">At { event.place.name }, on {moment(event.start_time).format('MMMM Do YYYY [at] h:mm:ss a')}</p>
                                            <p>{ event.description }</p>
                                        </article>
                                    }))
                                }
                            </div>
                        )
                    }
                    {
                        (!!posts && !!posts.length) && (
                            <div className="latest-posts">
                                <header>
                                    <h1>Latest Posts</h1>
                                </header>
                                {posts && posts.map((post, index) => {
                                    return <article>
                                        <p className="meta-info">{ moment(post.created_time).fromNow() }</p>
                                        <Linkify>
                                            <p>{post.message}</p>
                                        </Linkify>
                                        <img src={post.full_picture} alt=""/>
                                    </article>
                                })}
                            </div>
                        )
                    }
                </section>
                <footer className="primary-footer flex justify-between">
                    <p>{ name }, { new Date().getFullYear() }</p>
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
