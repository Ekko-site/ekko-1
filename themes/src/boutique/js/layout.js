import React from 'react'
import moment from 'moment'
import Linkify from 'react-linkify'
const API_KEY = 'AIzaSyCPuOwTgswye73SH5wa_5mlCgOYorCR3fY'

export default class Standard extends React.Component {

    render() {

        const { about, cover, picture, name, location, hours, call_to_actions, events, posts, phone, photos, description } = this.props.doc.data

        const style = {}
        if(cover && cover.source) {
            style.cover = {
                backgroundImage: `url(${cover.source})`
            }
        }

        console.log(this.props.doc.data)

        return (
            <div className="container">
                <header className="masthead">
                    <h1>{ name }</h1>
                    <nav>
                        <ul>
                            <li><a href="tel:0000000000">{ phone }</a></li>
                            <li><a className="button" href="#">Call</a></li>
                        </ul>
                    </nav>
                </header>
                <div className="cover-photo">
                    <div className="cover-photo--background" style={style.cover}></div>
                    <div className="cover-photo--content">
                        <p>{ about }</p>
                        {(location) && (
                            <p className="sub-text">{ location.street }, { location.city }</p>
                        )}
                    </div>
                </div>
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
                <aside className="info-sidebar">
                    {(hours) && (
                        <section>
                            <header><h1>Opening Hours</h1></header>
                            <ul className="list-reset">
                                <li>Monday <span className="bold right pl2">{hours.mon_1_open} - {hours.mon_1_close}</span></li>
                                <li>Tuesday <span className="bold right pl2">{hours.tue_1_open} - {hours.tue_1_close}</span></li>
                                <li>Wednesday <span className="bold right pl2">{hours.wed_1_open} - {hours.wed_1_close}</span></li>
                                <li>Thursday <span className="bold right pl2">{hours.thu_1_open} - {hours.thu_1_close}</span></li>
                                <li>Friday <span className="bold right pl2">{hours.fri_1_open} - {hours.fri_1_close}</span></li>
                                <li>Saturday <span className="bold right pl2">{hours.sat_1_open} - {hours.sat_1_close}</span></li>
                                <li>Sunday <span className="bold right pl2">{hours.sun_1_open} - {hours.sun_1_close}</span></li>
                            </ul>
                        </section>
                    )}
                    {(location) && (
                        <section>
                            <header><h1>Address</h1></header>
                            <p>{location.street}, {location.city}, {location.country}, {location.zip}</p>
                            {
                                (location.street) && (
                                    <iframe
                                        className="ml1" src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${location.street || ''}, ${location.city}, ${location.zip}`} frameBorder="0"></iframe>
                                )
                            }
                        </section>
                    )}
                </aside>
                <footer className="primary-footer">
                    <p>{ name }, 2016</p>
                    <p>Site by Ekko</p>
                </footer>
            </div>
        )
    }
}
