import React from 'react'
import moment from 'moment'
import Linkify from 'react-linkify'

const API_KEY = 'AIzaSyCPuOwTgswye73SH5wa_5mlCgOYorCR3fY'

const fbImage = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABIZJREFUaAXtWt2LFEcQr56v3Tsw6rmnYh6ihrvThIQgMSF+YCAPK5yHJMGXJIgiQshTngJ58CUvgi95yB+QD8hLEhMSPchFJCYXxYtgVAhIjkQOc37s7Z2nHt7uzHR3qmadcXbtWfuWzNwK27BMT01116+qq2p6uhbgMW8sCX9xz489VZ+t4cx1kniyoJvScXOWvDby9c4ZlbyHFHh16NgGZtsfCCmLwKAXpLBUAzOjMcMHCVMGYyOSeUdOHR26HJddp8D23ceLlml/wUxrpeAuSCnjvIvWZ4yBYTpoS7/kg7d39OiukRBMpMC214f7LWacZswsCOGFz9vqahg2GpWXfSm2/vbd4F8EzggRmgw+NMxc24InnGRYXIkCYQ1xBwpQwKKf7RS8GtLb9kquTViLRcSMLVBg3uVPIrW3XXy+mfXuYyxUu/01kQLSFDYAi9yp2QRt8szkTAbpfVFSJCU3nwvgHDuU6KJUUjOPhU5uWXr2zFwB1xOQz5nwTH8P9K1/Anp78uA4cbAMLvw5DaNnb2gpkakCritg0/Mr4N29G+DZgeWA6V3ZbIvBz6evowLKx3VEDZY6/pZvPLT8pudWwJFDm6G7q7lYzxfacuJrpz1ooYzk8+Qm7+3f+EjwC507EwUoYAeeXgYb+5Zp4dMNYJqs+VpqiXs0E2WbfgxYlc9TUA+fuArjV27jNgETEsbFPxN3wW63LFTAbKNq5y+V4fAnF8EwHkR0W6ZR21Z768ysCyaCz2FqbaWpZ21lphbHPLB7axOkFgO0Z/F8es0CkJ9zUes3whRIp+eswYXiLtU4Jn6figI+Bm3fuiVw4K2BQBaBXP/UkrjcqP/iCwX4+KOX62Lg5Og1GDk1CU6C20WDsZOKAgR4+dIcbHtpVVyWsr+qtwvoF29nzt3Evb96xeJ81E8tBnQBNAKiVDrx71wQ2I3PVPepKaASpkO7N+9DqVzBLy+98E5NAdVLS0eBmdkqzN52AU8hdNjTiQF6i45fuQPvHzobgKAs8+bgWnhte/ARVQds7PwUfP7VeBSwc/fw3AE3c5r401GAhN+d8+D3C+UAbKXKYctmdUCXpytASoQvMsqmbbEXorMcx665AQU0vW1VjfI9pUudlKkcryI+TrTUgjgrI3QUyMrSSXI6K5BkmazonRXIytJJcjorkGSZrOidFcjK0klyghVgnGNRTOofSCbN1oSetL/X/XhvmJrXMN//Jvac/KTD+RQDtjqNKg3tNL//aQLG/igF5YAQDO1Pp29VIenMKOSLX2mXixjLXZX8JNGjPe6ON4Y/Nc2ufdyfj/P/b306XlQdrdAK0EmcbjOtPBZGKp/98u3gfhoTBTHOf1j41TKVMtNoJoIM9/3x60LAEzYs8pUJa4gxUoDqrlidfxtDoURasqBkRpZZ/B9hIUzoOyXO+TthjZiUqDuQnLj85d/r+vYcEwbrRtgrETse2MhIyVDrTK+M4V8N2E0mxTfS8w7++sPQWFw+mVfZXsHacc738c8etWqgkikDosXsKtZGrif92SMDCOmK+A8yYWvI0azUBAAAAABJRU5ErkJggg=="

const fbBWImage = "iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAy5JREFUWAntWT1rYkEUHX0vQRZkDQuaymoRImixsmlWSJtqt9KfIFhaio2pLS2ElHZqZ2NjtaXEXQiENKmCiLFwDYqIUbP3DBl39vk+FJ+awoFxvueeOffeN8PVwTQpkUgcDQaDj4qiHGmGttqczWYvbrf7+fr6+kUW5BCNcrmsVCqVc4fD8YX6Tigr8/lcDG+1dDqd2H9G+c/r6+uvWCzWiMfjaDMOMJvNqvf399+JtTBA7QoYAMgJQJGJzduzs7Mq4ZoqmODz+c4J3LfpdMroBPKandYhG+Soqurrdruju7u7lgKbG41GP0i1H/YJTssEsXgSjUZ/O+EQRKtnX2rVAkMbWICJY4O3Uge3Ur3J++oDJmBTtw0AbMC231jhTiDLJHuTm0t189Gl6et1TCYT5vF4WCQSYYFAgNdlQA8PD6xUKsEpDDc2HjFcstoAwIXDYZZMJtnp6anuIjNgYsFWAEKdXq+XpVIpzpoQpi2hequ0FecAexcXF6bgAGxvDEJwMBhcImc8HrNGo8H6/T53llarteQ02kW2qxjqPT4+1mWvXq+zQqGwYA7XGuaaJdsBQhgE66mv1+vxfpfLZYbpvzHbAII5kQHQKMExZOfQO4i81haAQq1+v3/Bnp7q4NmwTTFGbwBmZYe2AcQH+erqaiFcZkHULy8vGbJIsMl8Ps/MVG6sC7HLGiWYXCe1223L6bYCNLM9PSQAaLXGFhUL4bApwaKe2mQHQf3p6Wk3AOGJ+IRkMhmOFe10Or10B1erVVar1bid4iD4YO/Ei4EKAjudzgKg/CnhnfQzHA75HOHFVuCwzlYVQyCAGgmGvSEbjYuDyKWtTiJvbFf9AHBTJg8MHhjclIFN1x9s8N0yuM5tYXYIFZFNun7wkOOhOLPJq47J97K8Bnex1fNKzAcmYFMRdqWXSJ9O/Akbb5oAAPvkcrklMHhAiIeCmRzsQXP79Ep/VprN5jwUCiGS9NkOgEIwwGizGLMqCQum/CwWi4/ciyncekPRgFvYzaoqsBKCfbR5lTXA8BYCvsH8RRCdAtcKbfiVoqwR6t9rEJ3kNyig/y+IDqQivbe/If4CE91gp3aUEu4AAAAASUVORK5CYII="

const phoneImage = "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAjVJREFUSA21ls9LVUEUx999YJogz4WBbhJMbKE9MAzcR1BQREt3LtLauRbDRavciYK8Tf0NbdwIrfqxLAgjglJIaGGI4o9In3r7nPfuwHTvzJ25r+nAhztz5nvO9717uTO3VLJEHMcVuAODFkn4NGYj8B4kduBBeJdUR0xuwQ/QY5fJSEoabkrzcdjTHbXxK8Zt4dySTjTtgo+akWk4/T+MH5ucUrkN5t3BzGlWhjcpE9v0XgjjctKkl+uwZ8M+T12uTBlLs0qusrn4i8tbD51ToozbUUYO9RHrU1EUfXLo/Jd5mFU4tT1U8l/hpn9HTyVNe2AbTCH5q56tvGXqVu9QsW6p+sDt/WJZazndMKZxTIdVS5c+/nH4HUuZ0bwfTNulPPvwz1cZyxWDGpjiNckLujbomOZXQE4iU8wFNUs3w3HW5EruN9xN64PNaX4R3oEpfpK84TJDIyfdJZcus07RNZAvD1N8JzmaKUoSrM2AnGLy/r+EMZvWmKdgAs7AFPKFclsvZB7BokG8T+6hrnWOKZg3NFKpYwZLMAbyjfYc8uIpi67zoPmbRAgred1Yk7ty4tCo5WfOf6sEVLTBC1X5j9dz6hubkdqrlU/mynZaJ/kIapnF4gm51dcLlfFL5bY/gTq0GlsUDhUyVmIK74O8LkXjMwVV1aelKw3kxFqGA/CJNUT9LZmZimg2DAuwDrKl6nHIRL5cJyFzrPq9VyZXLUfjDqYDcBk64QA24Vty1jP8O/4AdWohSuE+fb0AAAAASUVORK5CYII="


class Kendrick extends React.Component {

    render() {

        const { about, cover, picture, name, location = {}, hours = {}, call_to_actions, events, posts, phone, photos, description, screennames, emails, id } = this.props.doc.data

        let tel = phone && !phone.match(/<<not-applicable>>/i) ? phone : null

        const showMap = location.street
        const showAbout = description
        const showHours = !!(Object.keys(hours).length)
        const showLocation = !!(Object.keys(location).length)
        const showEvents = !!(events.length)

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
        const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        const currentWeekday = weekdays[new Date().getDay()]

        const firstPost = posts.length ? posts[0] : null
        let firstPostId, firstPostURL
        if(firstPost) {
            firstPostId = firstPost.id.match(/_/) ? firstPost.id.split('_').pop() : null
            firstPostURL = firstPostId ? `https://facebook.com/${id}/posts/${firstPostId}` : `https://facebook.com/${id}`
            posts.shift()
        }
        const showPosts = !!(posts.length)
        return (
            <div>
                <div className="container header relative" style={style.cover}>
                <style>
                    @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,600|Raleway:300,400,900);
                    @import url(https://npmcdn.com/basscss@8.0.1/css/basscss.min.css);
                </style>
                  <div className="overlay absolute"></div>
                  <div className="clearfix thin navigation">
                    <div className="sm-col sm-col-3">
                      <span className="logo-ident">{ name }</span>
                    </div>
                    <div className="sm-col sm-col-9 right nav">
                      <ul className="flex flex-auto list-reset right">
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
                              <li><a href="#map">find us</a></li>
                          )}
                          {
                              tel && (
                                  <li className="bold phone" style={{
                                      backgroundImage: `url(data:image/png;base64,${ phoneImage })`
                                  }}><a href={`tel:${tel}`}>{ tel }</a></li>
                              )
                          }
                      </ul>
                    </div>
                  </div>
                  <div className="clearfix h70 flex flex-column justify-center relative">
                    <div className="sm-col sm-col-10">
                      <h1>We're <span className="page-name">{ name }</span></h1>
                      {/* <!-- "We're" should be before every page name --> */}
                    </div>
                  </div>
                </div>

                {
                    showAbout && (
                        <div className="container about" id="about">
                          <div className="clearfix">
                            <div className="sm-col sm-col-4"><h2>About</h2></div>
                            <div className="sm-col sm-col-8">
                              <p>{ description }</p>
                            </div>
                          </div>
                        </div>
                    )
                }

                {
                    (showPosts || firstPost) && (
                        <div className="container latest" id="posts">
                          <div className="clearfix">
                            <div className="sm-col sm-col-4"><h2>Latest</h2></div>
                            <div className="sm-col sm-col-8">
                              <p>Read live updates from the team at <span>{ name }</span>.</p>
                            </div>

                            <div className="sm-col sm-col-12 post top-post flex relative">
                                {firstPost.full_picture && (
                                  <div className="sm-col sm-col-6 photo" style={{
                                      backgroundImage: `url(${ firstPost.full_picture })`
                                  }}>

                                  </div>
                                )}
                              <div className={`sm-col sm-col-${firstPost.full_picture ? '6' : '12'} flex flex-column justify-center py2`}>
                                <div className="time-stamp clear">
                                  <span className="time">{ moment(firstPost.created_time).fromNow() } via</span>
                                  <a className="fb-logo" style={{
                                      backgroundImage: `url(data:image/png;base64,${ fbImage })`
                                  }} href={firstPostURL}></a>
                                </div>
                                <div className="description clear">
                                  <p><Linkify className="post-message">{ firstPost.message }</Linkify></p>
                                </div>
                              </div>
                            </div>

                            {
                                posts.map((post, index) => {
                                    const lastPost = index == (posts.length - 1)
                                    const postId = post.id.match(/_/) ? post.id.split('_').pop() : null
                                    const postURL = postId ? `https://facebook.com/${id}/posts/${postId}` : `https://facebook.com/${id}`
                                    return <div className={`sm-col sm-col-12 post flex relative ${lastPost && 'last-post'}`}>
                                        {post.full_picture && (
                                            <div className="sm-col sm-col-3 photo small"  style={{
                                                backgroundImage: `url(${ post.full_picture })`
                                            }}>

                                            </div>
                                        )}
                                      <div className={`sm-col sm-col-${post.full_picture ? '9' : '12'} flex flex-column justify-center`}>
                                        <div className="time-stamp">
                                          <span className="time">{ moment(post.created_time).fromNow() } via</span>
                                          <a className="fb-logo" style={{
                                              backgroundImage: `url(data:image/png;base64,${ fbImage })`
                                          }} href={ postURL }></a>
                                        </div>
                                        <p><Linkify className="post-message">{ post.message }</Linkify></p>
                                      </div>
                                      {
                                          lastPost && (
                                              <a href={`https://facebook.com/${id}/posts`} className="button absolute fb-external-link">See all posts on Facebook</a>
                                          )
                                      }
                                    </div>
                                })
                            }

                          </div>
                        </div>
                    )
                }

                {
                    showEvents && (
                        <div className="container events">
                          <div className="clearfix">
                            <div className="sm-col sm-col-12"><h2>What's on?</h2></div>

                            {
                                events.map(event => {
                                    return <div className="sm-col sm-col-4 event px2">
                                      <p className="title">{ event.name }</p>
                                      <span className="date">On { moment(event.start_time).format('dddd, Do MMMM YYYY [at] H:mm') }</span>
                                      <div className="seperator"></div>
                                      <p><Linkify className="event-description">{ event.description }</Linkify></p>
                                      <a className="button see-more" href={`https://facebook.com/${event.id}`}>Join on Facebook</a>
                                    </div>
                                })
                            }

                          </div>
                        </div>
                    )
                }
                {
                    (showMap || showHours) && (
                        <div className="container other-information">
                          <div className="clearfix">
                            {
                                showMap && (
                                    <div className={`sm-col sm-col-${showHours ? '8' : '12'} map`}>
                                      <h2>Find Us</h2>
                                      <div className="map google-map" id="map">
                                          <iframe
                                              style={{
                                                  width: '100%'
                                              }}
                                              src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${location.street || ''}, ${location.city}, ${location.zip}`} frameBorder="0" />
                                      </div>
                                    </div>
                                )
                            }
                            {
                                showHours && (
                                    <div className={`sm-col sm-col-${!showMap ? '12' : '4'} times`}>
                                      <h2>Opening Times</h2>
                                      <ul className="list-reset times">
                                        <li className={`${currentWeekday == 'monday' ? 'highlight' : ''}`}>Monday <span className="bold right pl2">{hours.mon_1_open} - {hours.mon_1_close}</span></li>
                                        <li className={`${currentWeekday == 'tuesday' ? 'highlight' : ''}`}>Tuesday <span className="bold right pl2">{hours.tue_1_open} - {hours.tue_1_close}</span></li>
                                        <li className={`${currentWeekday == 'wednesday' ? 'highlight' : ''}`}>Wednesday <span className="bold right pl2">{hours.wed_1_open} - {hours.wed_1_close}</span></li>
                                        <li className={`${currentWeekday == 'thursday' ? 'highlight' : ''}`}>Thursday <span className="bold right pl2">{hours.thu_1_open} - {hours.thu_1_close}</span></li>
                                        <li className={`${currentWeekday == 'friday' ? 'highlight' : ''}`}>Friday <span className="bold right pl2">{hours.fri_1_open} - {hours.fri_1_close}</span></li>
                                        <li className={`${currentWeekday == 'saturday' ? 'highlight' : ''}`}>Saturday <span className="bold right pl2">{hours.sat_1_open} - {hours.sat_1_close}</span></li>
                                        <li className={`${currentWeekday == 'sunday' ? 'highlight' : ''}`}>Sunday <span className="bold right pl2">{hours.sun_1_open} - {hours.sun_1_close}</span></li>
                                      </ul>
                                    </div>
                                )
                            }
                            </div>
                        </div>
                    )
                }

                {(tel || emails) && (
                    <div className="container contact">
                      <div className="clearfix">
                        <div className="sm-col sm-col-12">
                          <h2>Get in touch</h2>
                          {
                              tel && (
                                  <p className="tel">{ tel }</p>
                              )
                          }
                          {
                              emails && emails.map(email => <a className="mail" href={`mailto:${email}`}>{ email }</a>)
                          }
                        </div>
                      </div>
                    </div>
                )}

                <div className="container footer">
                  <div className="clearfix">
                    <div className="sm-col sm-col-6">
                      <p>{ name }, { new Date().getFullYear() }</p>
                    </div>
                    <div className="sm-col sm-col-6">
                      <a className="fb-logo bw" style={{
                          backgroundImage: `url(data:image/png;base64,${ fbBWImage })`
                      }} href={`http://facebook.com/${ id }`}></a>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}

export default Kendrick
