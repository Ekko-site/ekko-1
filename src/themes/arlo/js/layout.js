import React from 'react'
import moment from 'moment'
import Linkify from 'react-linkify'

const API_KEY = 'AIzaSyCPuOwTgswye73SH5wa_5mlCgOYorCR3fY'

const vals = obj => Object.keys(obj).map(key => obj[key])

class Arlo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleMapClick (event) {
        event.target.querySelector('iframe').style.pointerEvents = 'auto'
    }

    render() {

        const { about, cover, picture, name, location = {}, hours, call_to_actions, events, posts, phone, photos, description, screennames, emails, id } = this.props.doc.data

        const style = {}
        if(cover.source) {
            style.cover = {
                backgroundImage: `linear-gradient(
                    rgba(72, 94, 242, 0.95),
                    rgba(72, 94, 242, 0.95)
                ), url(${ cover.source })`
            }
        } else {
            style.cover = {
                backgroundColor: 'rgb(72, 94, 242)'
            }
        }

        let tel = phone && !phone.match(/<<not-applicable>>/i) ? phone : null
        const showMap = !!(Object.keys(location).length)
        const showPosts = !!(posts.length)
        const showCover = !!(cover.source)

        return (
            <div className="container mx-auto">
                <div className="content">
                    <header className="flex p2 items-center">
                        <div className="flex items-center flex-auto">
                            <div className="profile-picture mr2">
                                <img src={ picture.url } alt=""/>
                            </div>
                            <h4 className="h4">
                                { about }
                            </h4>
                        </div>
                        <div className="links">
                            {
                                tel && (
                                    <a href={`tel:${ tel }`}>{ tel }</a>
                                )
                            }
                        </div>
                    </header>
                    <div className="hero">
                        <div className="name-cover flex justify-center items-center flex-column px2 py4" style={style.cover}>
                            <h1 className="h1 name mb2">
                                { name }
                            </h1>
                            <pre className="center description max-width-3">
                                { description.trim() }
                            </pre>
                        </div>
                        <div className="flex map-contact" style={{
                            height: `${showMap ? '420px' : 'auto'}`
                        }}>
                            {
                                showMap && (
                                  <div className={`map col-6`} onClick={this.handleMapClick} id="map">
                                      <iframe
                                          src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${ vals((({ street, city, country }) => ({ street, city, country }))(location)).filter(Boolean).join(', ') }`} frameBorder="0" />
                                  </div>
                                )
                            }
                            <div className={`col-${showMap ? '6' : '12'} flex flex-column items-center justify-center px2 py4`} style={{
                                background: 'rgb(246, 247, 249)'
                            }}>
                                <p className="mb2 address">
                                    {
                                        vals((({ street, city, country }) => ({ street, city, country }))(location)).filter(Boolean).join(', ')
                                    }
                                </p>
                                <a className="btn" href={`https://m.me/${ id }`}>Get in touch</a>
                            </div>
                        </div>
                    </div>
                    {
                        showPosts && (
                            <div className="posts flex flex-column px2 py4">
                                <div className="flex mb4 posts-wrap justify-center">
                                    {
                                        posts.slice(0, 3).map((post, index) => {
                                            const postId = post.id.match(/_/) ? post.id.split('_').pop() : null
                                            const postURL = postId ? `https://facebook.com/${id}/posts/${postId}` : `https://facebook.com/${id}`
                                            const text = <div className="p1">
                                                <a href={postURL} className="post-created mb2 block">{ moment(post.created_time).fromNow() }</a>
                                                <p className="post-message">"<Linkify>{ post.message }</Linkify>"</p>
                                            </div>
                                            const img = post.full_picture ? <div className="post-picture mb2">
                                                <img className="" src={ post.full_picture } alt=""/>
                                            </div> : null
                                            return <div className="flex flex-column col-4 post px2">
                                                {
                                                    [img, text]
                                                }
                                            </div>
                                        })
                                    }
                                </div>
                                <div className="center">
                                    <a className="btn" href={`https://facebook.com/${ id }/posts`}>View more posts on Facebook</a>
                                </div>
                            </div>
                        )
                    }
                </div>
                <footer className="mt4 px2 py4 flex flex-column items-center justify-center">
                    <div className="screenames flex mb2">
                        {
                            (screennames || []).filter(s => ['Instagram', 'Twitter'].indexOf(s.service_name) > -1).concat([{
                                service_name: 'Facebook',
                                value: id
                            }]).map(s => {
                                return <a href={`http://${s.service_name.toLowerCase()}.com/${s.value}`} className={`inline-flex items-center mx1 screenname-btn icon-${s.service_name.toLowerCase()}`} />
                            })
                        }
                    </div>
                    {
                        emails && emails.map(email => <a className="bold text-decoration-none" href={`mailto:${email}`}>{ email }</a>)
                    }
                </footer>
            </div>
        )
    }
}

export default Arlo
