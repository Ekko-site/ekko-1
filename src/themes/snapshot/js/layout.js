import React from 'react'
import moment from 'moment'
import Linkify from 'react-linkify'
import Masonry from 'react-masonry-component'

const API_KEY = 'AIzaSyCPuOwTgswye73SH5wa_5mlCgOYorCR3fY'

import TwitterIcon from './twitter'
import InstagramIcon from './instagram'
import FacebookIcon from './facebook'

const iconComponents = {
    Twitter: <TwitterIcon />,
    Facebook: <FacebookIcon />,
    Instagram: <InstagramIcon />
}

const vals = obj => Object.keys(obj).map(key => obj[key])

class Snapshot extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentImageIndex: 0,
            lightboxShow: false
        }
    }

    handleMapClick (event) {
        event.target.querySelector('iframe').style.pointerEvents = 'auto'
    }

    openLightbox(index) {
        this.setState({
            currentImageIndex: index,
            lightboxShow: true
        })
    }

    closeLightbox() {
        this.setState({
            lightboxShow: false
        })
    }

    previousImageLightbox() {
        const { photos } = this.props.doc.data
        this.setState({
            currentImageIndex: ((this.state.currentImageIndex - 1) < 0) ? photos.length : --this.state.currentImageIndex
        })
    }

    nextImageLightbox() {
        const { photos } = this.props.doc.data
        this.setState({
            currentImageIndex: ((this.state.currentImageIndex + 1) > (photos.length - 1)) ? 0 : ++this.state.currentImageIndex
        })
    }

    getLightbox() {
        const { photos, id } = this.props.doc.data
        const photo = photos[this.state.currentImageIndex]
        const image = photo.images[0]
        return <div className="lightbox-outer flex items-center justify-center px2" onClick={() => this.closeLightbox()}>
            <div className="max-width-3 lightbox-inner" style={{
                color: '#fff'
            }} onClick={e => e.stopPropagation()}>
                <div className="flex justify-between mb2 lightbox-main-controls items-center">
                    <a href={`https://m.me/${ id }`} className="btn text-btn">Send a Message</a>
                    <a href="#" className="btn noselect" onClick={event => {
                        event.preventDefault()
                        this.closeLightbox()
                    }}>×</a>
                </div>
                <div className="flex items-center justify-center lightbox-main-navigation">
                    <a href="#" className="btn noselect" style={{
                        left: '-1rem'
                    }} onClick={event => {
                        event.preventDefault()
                        this.previousImageLightbox()
                    }}>‹</a>
                    <img src={ image.source } alt={ image.name } className="lightbox-main-img mb2" />
                    <a href="#" className="btn noselect" style={{
                        right: '-1rem'
                    }} onClick={event => {
                        event.preventDefault()
                        this.nextImageLightbox()
                    }}>›</a>
                </div>
                <div className="lightbox-info-panel p3">
                    <p className={`small-heading ${photo.name && 'mb2'}`}>
                        { moment(photo.created_time).format('Do MMMM YYYY') }
                    </p>
                    <p>
                        { photo.name }
                    </p>
                </div>
            </div>
        </div>
    }

    render() {

        const { about, cover, picture, name, location = {}, hours, call_to_actions, events, posts, phone, photos, description, screennames, emails, id } = this.props.doc.data

        let tel = phone && !phone.match(/<<not-applicable>>/i) ? phone : null
        const showMap = !!(Object.keys(location).length)
        const showPhotos = !!(photos.length)

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

        let childElements

        showPhotos && (childElements = photos.slice(0, 9).map((photo, index) => {
           const image = photo.images[0]
           return <li className="masonry-wrap__entry">
               <img className="" onClick={() => this.openLightbox(index)} src={ image.source } alt={ image.name } />
           </li>
        }))

        return (
            <div className="container">
                <style>
                    @import url(https://fonts.googleapis.com/css?family=Abel|Abril+Fatface);
                </style>
                {
                    this.state.lightboxShow && this.getLightbox()
                }
                <div className={`content ${this.state.lightboxShow && 'lightbox'}`}>
                    <header className="flex py2 px3 items-center">
                        <div className="name flex-auto">
                            <h1 className="logo">
                                { name }
                            </h1>
                        </div>
                        <div className="links">
                            <a href={`https://facebook.com/${ id }`} className="mr2">Visit on Facebook</a>
                            {
                                tel && (
                                    <a href={`tel:${ tel }`} className="mr2">Call Now</a>
                                )
                            }
                            <a href={`https://m.me/${ id }`}>Send a Message</a>
                        </div>
                    </header>
                    <div className="hero p2" style={style.cover}>
                        <div className="description center flex items-center justify-center">
                            <h2 className="billboard px2">
                                { about }
                                {(location.city && location.country) && (
                                    <span> in { location.city }, { location.country }</span>
                                )}
                            </h2>
                        </div>
                        <div className="screenames flex items-baseline justify-center links">
                            {
                                (screennames || []).filter(s => ['Instagram', 'Twitter'].indexOf(s.service_name) > -1).concat([{
                                    service_name: 'Facebook',
                                    value: id
                                }]).map(s => {
                                    const IconComponent = iconComponents[`${s.service_name}`]
                                    return <a href={`http://${s.service_name.toLowerCase()}.com/${s.value}`} className="inline-flex items-center mx1 screenname-btn circle center">
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
                    {
                        showPhotos && (
                            <div className="photographs max-width-4 mx-auto py4 px3">
                                <h2 className="section-heading center mb4">
                                    Photographs
                                </h2>
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
                        )
                    }
                    <div className="max-width-4 mx-auto py4 px3 about-container">
                        <h2 className="section-heading center mb4">
                            About
                        </h2>
                        <div className="flex about">
                            {
                                showMap && (
                                  <div className={`map col-8`} onClick={this.handleMapClick} id="map">
                                      <iframe
                                          src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${ vals((({ street, city, country }) => ({ street, city, country }))(location)).filter(Boolean).join(', ') }`} frameBorder="0" />
                                  </div>
                                )
                            }
                            <div className={`contact p4 ${ !showMap ? 'col-12' : 'col-4' }`}>
                                {
                                    showMap && (
                                        <div className="location mb3">
                                            <p className="small-heading mb1">
                                                Location
                                            </p>
                                            {
                                                vals((({ street, city, country, zip }) => ({ street, city, country, zip }))(location)).filter(Boolean).join(', ')
                                            }
                                        </div>
                                    )
                                }
                                <div className="contact-info">
                                    <p className="small-heading mb1">
                                        Contact Info
                                    </p>
                                    {
                                        tel && (
                                            <div className="phone">
                                                { tel }
                                            </div>
                                        )
                                    }
                                    <div className="fb-msg">
                                        <a href={`https://m.me/${ id }`}>Send Facebook Message</a>
                                    </div>
                                    {emails && emails.length && (
                                        (emails || []).map(e => <a href={`mailto:${e}`}>{ e }</a>)
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Snapshot
