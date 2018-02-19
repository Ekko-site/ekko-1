import React from 'react'
import moment from 'moment'
import Linkify from 'react-linkify'
import Masonry from 'react-masonry-component'

const API_KEY = 'AIzaSyCPuOwTgswye73SH5wa_5mlCgOYorCR3fY'

const vals = obj => Object.keys(obj).map(key => obj[key])

export default class Funk extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showMap: false
        }
    }

    toggleMap() {
        this.setState({
            showMap: !this.state.showMap
        }, () => {
            let body = document.body,
                html = document.documentElement,
                height = Math.max(body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight)
            window.scrollTo(0, height)
        })
    }

    render() {

        const { about, cover, picture, name, location = {}, hours, call_to_actions, events, posts, phone, photos, description, restaurant_services, restaurant_specialties, id, screennames } = this.props.doc.data

        const style = {}
        if(cover && cover.source) {
            style.cover = {
                backgroundImage: `url(${cover.source})`
            }
        }

        const showGallery = !!(photos && photos.length)
        const showPosts = posts && posts.length

        const vals = obj => Object.keys(obj).map(key => obj[key])

        const showRestaurantSpecialties = restaurant_specialties && Object.keys(restaurant_specialties).some(key => restaurant_specialties[key])

        const getRestaurantSpecialties = () => {
            return Object.keys(restaurant_specialties).filter(key => restaurant_specialties[key]).join(', ')
        }

        const showRestaurantServices = restaurant_services && Object.keys(restaurant_services).some(key => restaurant_services[key])

        const getServicePrefix = service => {
            switch (service) {
                case 'walkins':
                    return `${service} welcome`
                    break;
                case 'groups':
                case 'kids':
                    return `good for ${service}`
                    break;
                case 'outdoor':
                    return `${service} seating`
                default:
                    return service
                    break;
            }
        }

        const getRestaurantServices = () => {
            return Object.keys(restaurant_services).filter(key => restaurant_services[key]).map(service => {
                return <span className="capitals">
                    {
                        getServicePrefix(service)
                    }
                    <br/>
                </span>
            })
        }

        const showInfoPanel = showRestaurantServices || showRestaurantSpecialties || hours

        let tel = phone && !phone.match(/<<not-applicable>>/i) ? phone : null

        const outputHours = hours => {
            const days = {
                mon: 'Monday',
                tue: 'Tuesday',
                wed: 'Wednesday',
                thu: 'Thursday',
                fri: 'Friday',
                sat: 'Saturday',
                sun: 'Sunday'
            }
            return Object.keys(days).map((dayKey, index) => {
                return [
                    <div className="info-panel__times__day">
                        { days[dayKey] }:
                    </div>,
                    <div className="info-panel__times__hours">
                        {
                            (!(hours[`${dayKey}_1_open`]) || !(hours[`${dayKey}_1_close`])) && (
                                <span>CLOSED</span>
                            )
                        }
                        {
                            ((hours[`${dayKey}_1_open`]) || (hours[`${dayKey}_1_close`])) && (
                                <span>
                                    {hours[`${dayKey}_1_open`]} to {hours[`${dayKey}_1_close`]}
                                </span>
                            )
                        }
                    </div>
                ]
            })
        }

        // Load in photo feed

        let childElements

        showGallery && (childElements = photos.slice(0, 9).map(function(photo){
           const image = photo.images[0]
           return (
                <li className="masonry-wrap__entry">
                    <img src={image.source} />
                </li>
            )
        }))

        // Load in blog feed

        let childPostElements
        showPosts && (childPostElements = posts.slice(0, 6).map(function(post){
            const postId = post.id.match(/_/) ? post.id.split('_').pop() : null
            const postURL = postId ? `https://facebook.com/${id}/posts/${postId}` : `https://facebook.com/${id}`
            return (
                <li className="masonry-wrap__entry">
                    <div className="masonry-wrap__entry__blog">
                        <img src={post.full_picture} />
                        <p className="meta-info">{ moment(post.created_time).fromNow() } — <a href={postURL}>View post</a></p>
                        <p className="masonry-wrap__blog-text"><Linkify>{post.message}</Linkify></p>
                    </div>
                </li>
            )
        }))

        return (

            <div className="wrap">
                <div className="intro">
                    <div className="intro__bg" style={style.cover}></div>
                    <header className="site-header">
                        <div className="container">
                            <a href="/" className="site-header__icon">
                                <img src={picture.url} />
                            </a>
                            {
                                tel && (
                                    <tel className="site-header__phone">{ tel }</tel>
                                )
                            }
                        </div>
                    </header>
                    <div className="container">
                        <div className="grid">
                            <div className="grid__item one-whole lap--four-fifths desk--three-quarters push--desk--one-twelfth">
                                <h1 className="headline red">{ name }</h1>
                                {
                                    about && (
                                        <p className="emphasised blue-light">{ about }</p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    description && (
                        <div className="about-area">
                            <div className="container">
                                <div className="grid">
                                    <div className="grid__item one-whole lap--two-thirds push--lap--one-sixth desk--two-thirds push--desk--one-sixth">
                                        <pre>{ description }</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    showInfoPanel && (
                        <div className="info-panel">
                            <div className="container">
                                <div className="grid">
                                    <div className="grid__item one-whole">
                                        <div className="info-panel__wrap">
                                            {(hours) && (
                                                <div className="info-panel__block">
                                                    <div className="info-panel__times">
                                                        <h3 className="mini-title">Opening times</h3>
                                                        {
                                                            outputHours(hours)
                                                        }
                                                    </div>
                                                </div>
                                            )}
                                            {
                                                showRestaurantSpecialties && (
                                                    <div className="info-panel__block">
                                                        <h3 className="mini-title">Specialties</h3>
                                                        Serves { getRestaurantSpecialties() }
                                                    </div>
                                                )
                                            }
                                            {
                                                showRestaurantServices && (
                                                    <div className="info-panel__block">
                                                        <h3 className="mini-title">Services</h3>
                                                        { getRestaurantServices() }
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    (!showInfoPanel && !description) && (
                        <div className="info-feed-spacer"></div>
                    )
                }
                {
                    !!(events.length) && (
                        <div className="upcoming-events">
                            <div className="container">
                                <div className="grid">
                                    <div className="grid__item palm--one-whole lap--one-quarter desk--one-quarter">
                                        <h2 className="light-title">{events.length} upcoming event{(events.length > 1) && 's'}</h2>
                                    </div>
                                    <div className="grid__item palm--one-whole lap--three-quarters desk--three-quarters">
                                        {
                                            events.map(event => {
                                                return <article>
                                                    <h3 className="no-mb"><a href={`https://facebook.com/${event.id}`}>{ event.name }</a></h3>
                                                    <p className="meta">{ moment(event.start_time).format('dddd, Do MMMM YYYY [at] H:mm') }</p>
                                                    <p>{ event.description.slice(0, 160) }&hellip;</p>
                                                </article>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    (!!showPosts) && (
                        <div className="gallery">
                            <div className="container">
                                <div className="grid">
                                    <div className="grid__item palm--one-whole lap--one-quarter desk--one-quarter">
                                        <h2 className="light-title">News and photos</h2>
                                    </div>
                                    <div className="grid__item palm--one-whole lap--three-quarters desk--three-quarters">
                                        <Masonry
                                            className={'masonry-wrap'} // default ''
                                            elementType={'ul'} // default 'div'
                                            options={{
                                              transitionDuration: 0
                                            }}
                                        >
                                            {childPostElements}

                                        </Masonry>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    showGallery && (
                        <div className="gallery">
                    <div className="container">
                        <div className="grid">
                            <div className="grid__item palm--one-whole lap--one-quarter desk--one-quarter">
                                <h2 className="light-title">More in the gallery</h2>
                            </div>
                            <div className="grid__item palm--one-whole lap--three-quarters desk--three-quarters">

                                <Masonry
                                    className={'masonry-wrap'} // default ''
                                    elementType={'ul'} // default 'div'
                                    options={{
                                      transitionDuration: 0
                                    }}
                                >
                                    {childElements}
                                </Masonry>

                            </div>
                        </div>
                    </div>
                </div>

                    )
                }

                <footer className="site-footer">
                    <div className="container">
                        <div className="grid">
                            <div className="grid__item one-whole">
                                {
                                    tel && (
                                        <p className="h2">{ tel }</p>
                                    )
                                }
                                <div className="emphasised blue-light">
                                    <p className="no-mb">
                                        {
                                            vals((({ street, city, country, zip }) => ({ street, city, country, zip }))(location)).filter(Boolean).join(', ')
                                        }
                                    </p>
                                </div>

                                {(location.street || location.city || location.zip) && (!this.state.showMap) && (
                                    <a href="#" onClick={event => {
                                        event.preventDefault()
                                        this.toggleMap()
                                    }} className="show-map">View location on map</a>
                                )}

                                {(location.street || location.city || location.zip) && (this.state.showMap) && (
                                    <a href="#" onClick={event => {
                                        event.preventDefault()
                                        this.toggleMap()
                                    }} className="show-map">Close map</a>
                                )}

                                {(location.street || location.city || location.zip) && (this.state.showMap) && (
                                    <div className="site-footer__map">
                                        <iframe src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${ vals((({ street, city, country }) => ({ street, city, country }))(location)).filter(Boolean).join(', ')}`} frameBorder="0"></iframe>
                                    </div>
                                )}

                                {
                                    (!!screennames.length) && (
                                        <p className="site-footer__social">
                                            {
                                                (screennames || []).filter(s => ['Instagram', 'Twitter'].indexOf(s.service_name) > -1).concat([{
                                                    service_name: 'Facebook',
                                                    value: id
                                                }]).map(s => {
                                                    return <a href={`http://${s.service_name.toLowerCase()}.com/${s.value}`} className={`site-footer__social__link site-footer__social__link--${s.service_name.toLowerCase()}`}>{ s.service_name }</a>
                                                })
                                            }
                                        </p>
                                    )
                                }

                            </div>
                        </div>
                    </div>

                </footer>
            </div>
        )
    }
}
