'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactLinkify = require('react-linkify');

var _reactLinkify2 = _interopRequireDefault(_reactLinkify);

var _twitter = require('./twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _instagram = require('./instagram');

var _instagram2 = _interopRequireDefault(_instagram);

var _facebook = require('./facebook');

var _facebook2 = _interopRequireDefault(_facebook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var API_KEY = 'AIzaSyCPuOwTgswye73SH5wa_5mlCgOYorCR3fY';

var iconComponents = {
    Twitter: _react2.default.createElement(_twitter2.default, null),
    Facebook: _react2.default.createElement(_facebook2.default, null),
    Instagram: _react2.default.createElement(_instagram2.default, null)
};

var Junipero = function (_React$Component) {
    _inherits(Junipero, _React$Component);

    function Junipero() {
        _classCallCheck(this, Junipero);

        return _possibleConstructorReturn(this, (Junipero.__proto__ || Object.getPrototypeOf(Junipero)).apply(this, arguments));
    }

    _createClass(Junipero, [{
        key: 'render',
        value: function render() {
            var _props$doc$data = this.props.doc.data,
                about = _props$doc$data.about,
                cover = _props$doc$data.cover,
                picture = _props$doc$data.picture,
                name = _props$doc$data.name,
                _props$doc$data$locat = _props$doc$data.location,
                location = _props$doc$data$locat === undefined ? {} : _props$doc$data$locat,
                _props$doc$data$hours = _props$doc$data.hours,
                hours = _props$doc$data$hours === undefined ? {} : _props$doc$data$hours,
                call_to_actions = _props$doc$data.call_to_actions,
                _props$doc$data$event = _props$doc$data.events,
                events = _props$doc$data$event === undefined ? [] : _props$doc$data$event,
                _props$doc$data$posts = _props$doc$data.posts,
                posts = _props$doc$data$posts === undefined ? [] : _props$doc$data$posts,
                phone = _props$doc$data.phone,
                photos = _props$doc$data.photos,
                description = _props$doc$data.description,
                screennames = _props$doc$data.screennames,
                emails = _props$doc$data.emails,
                id = _props$doc$data.id;


            var style = {};
            if (cover && cover.source) {
                style.cover = {
                    backgroundImage: 'url(' + cover.source + ')'
                };
            } else {
                style.cover = {
                    background: '#2C3437'
                };
            }

            var showMap = location.street;
            var showAbout = description;
            var showPosts = !!posts.length;
            var showHours = !!Object.keys(hours).length;
            var showLocation = !!Object.keys(location).length;
            var showEvents = !!events.length;

            var tel = phone && !phone.match(/<<not-applicable>>/i) ? phone : null;

            return _react2.default.createElement(
                'div',
                { className: 'container mx-auto' },
                _react2.default.createElement(
                    'style',
                    null,
                    '@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700|Playfair+Display:700);'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'intro relative', style: style.cover },
                    _react2.default.createElement('div', { className: 'overlay absolute' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'intro-content mx-auto p4' },
                        _react2.default.createElement(
                            'div',
                            { className: 'navigation caps flex' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'flex list-reset flex-auto bold' },
                                showAbout && _react2.default.createElement(
                                    'li',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '#about' },
                                        'about'
                                    )
                                ),
                                showEvents && _react2.default.createElement(
                                    'li',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '#events' },
                                        'events'
                                    )
                                ),
                                showPosts && _react2.default.createElement(
                                    'li',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '#posts' },
                                        'latest posts'
                                    )
                                ),
                                showHours && _react2.default.createElement(
                                    'li',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '#contact' },
                                        'opening times'
                                    )
                                ),
                                showMap && _react2.default.createElement(
                                    'li',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '#map' },
                                        'getting here'
                                    )
                                ),
                                showLocation && _react2.default.createElement(
                                    'li',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '#contact' },
                                        'contact'
                                    )
                                )
                            ),
                            tel && _react2.default.createElement(
                                'p',
                                { className: 'phone right-align' },
                                'call: ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'tel:' + tel },
                                    tel
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'h100 flex flex-column justify-center' },
                            _react2.default.createElement(
                                'h1',
                                { className: 'name max-width-3 mb3 title' },
                                name
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'about-text max-width-2' },
                                _react2.default.createElement(
                                    _reactLinkify2.default,
                                    null,
                                    about
                                )
                            )
                        )
                    )
                ),
                showAbout && _react2.default.createElement(
                    'div',
                    { className: 'about p4', id: 'about' },
                    _react2.default.createElement(
                        'h2',
                        { className: 'center about-title mb4' },
                        'About'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'description-text max-width-3 mx-auto align-left' },
                        description
                    )
                ),
                showEvents && _react2.default.createElement(
                    'div',
                    { className: 'events p4', id: 'events' },
                    _react2.default.createElement(
                        'h2',
                        { className: 'center events-title mb4' },
                        'Events'
                    ),
                    Array.isArray(events) && _react2.default.createElement(
                        'div',
                        { className: 'events-list flex justify-center' },
                        events.map(function (event) {
                            return _react2.default.createElement(
                                'div',
                                { className: 'col-' + (events.length > 1 ? '4' : '12') + ' center event' },
                                _react2.default.createElement(
                                    'p',
                                    { className: 'event-time mb2 caps' },
                                    (0, _moment2.default)(event.start_time).format('dddd, Do MMMM YYYY [at] H:mm')
                                ),
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'event-title mb2' },
                                    event.name
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'event-description italic mb3 max-width-3 mx-auto' },
                                    _react2.default.createElement(
                                        _reactLinkify2.default,
                                        null,
                                        event.description
                                    )
                                ),
                                _react2.default.createElement(
                                    'a',
                                    { className: 'event-fb-btn inline-block caps text-decoration-none py1 px3 bold', href: 'https://facebook.com/' + event.id },
                                    'View on Facebook'
                                )
                            );
                        })
                    )
                ),
                showPosts && _react2.default.createElement(
                    'div',
                    { className: 'posts pt4', id: 'posts' },
                    _react2.default.createElement(
                        'h2',
                        { className: 'center posts-title mb4' },
                        'Latest Posts'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'flex flex-wrap' },
                        posts.map(function (post, index) {
                            var postId = post.id.match(/_/) ? post.id.split('_').pop() : null;
                            var postURL = postId ? 'https://facebook.com/' + id + '/posts/' + postId : 'https://facebook.com/' + id;
                            var textWidth = !post.full_picture ? '100%' : null;
                            var text = _react2.default.createElement(
                                'div',
                                { className: 'post-square center post-content flex items-center flex-column justify-center', style: !post.full_picture ? {
                                        width: textWidth
                                    } : {} },
                                _react2.default.createElement(
                                    'p',
                                    { className: 'post-message px2 mb2' },
                                    '"',
                                    _react2.default.createElement(
                                        _reactLinkify2.default,
                                        null,
                                        post.message
                                    ),
                                    '"'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'post-created caps mb2' },
                                    (0, _moment2.default)(post.created_time).fromNow()
                                ),
                                _react2.default.createElement(
                                    'a',
                                    { href: postURL },
                                    _react2.default.createElement(_facebook2.default, { colour: true })
                                )
                            );
                            var img = post.full_picture ? _react2.default.createElement(
                                'div',
                                { className: 'post-square post-image flex justify-center items-center' },
                                _react2.default.createElement('img', { className: '', src: post.full_picture, alt: '' })
                            ) : null;
                            return _react2.default.createElement(
                                'div',
                                { className: 'flex col-6 post' },
                                [2, 3, 6, 7].indexOf(index) === -1 ? [img, text] : [text, img]
                            );
                        })
                    )
                ),
                showMap && _react2.default.createElement(
                    'div',
                    { className: 'map', id: 'map' },
                    _react2.default.createElement('iframe', {
                        src: 'https://www.google.com/maps/embed/v1/place?key=' + API_KEY + '&q=' + (location.street || '') + ', ' + location.city + ', ' + location.zip, frameBorder: '0' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'contact flex mx-auto relative py4', id: 'contact', style: {
                            marginTop: showMap ? '-200px' : 0
                        } },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-6 mx4 address' },
                        showLocation && _react2.default.createElement(
                            'h2',
                            { className: 'address-title mb2 title mt2' },
                            location.city && _react2.default.createElement(
                                'span',
                                null,
                                location.city,
                                ', ',
                                location.country
                            ),
                            !location.street && _react2.default.createElement(
                                'span',
                                null,
                                location.country
                            )
                        ),
                        showLocation && _react2.default.createElement(
                            'p',
                            { className: 'mb3 address-one' },
                            [location.street, location.city, location.country, location.zip].filter(Boolean).join(', ')
                        ),
                        emails && _react2.default.createElement(
                            'p',
                            null,
                            'email: ',
                            emails.map(function (email) {
                                return _react2.default.createElement(
                                    'a',
                                    { className: 'bold text-decoration-none', href: 'mailto:' + email },
                                    email
                                );
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-6 mx4 contact-details' },
                        tel && _react2.default.createElement(
                            'h2',
                            { className: 'address-phone mb2 title' },
                            tel
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'flex opening-times' },
                            showHours && [_react2.default.createElement(
                                'p',
                                { className: 'mr3 bold' },
                                'Opening Times'
                            ), _react2.default.createElement(
                                'ul',
                                { className: 'list-reset' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Monday ',
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'bold right pl2' },
                                        hours.mon_1_open,
                                        ' - ',
                                        hours.mon_1_close
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Tuesday ',
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'bold right pl2' },
                                        hours.tue_1_open,
                                        ' - ',
                                        hours.tue_1_close
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Wednesday ',
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'bold right pl2' },
                                        hours.wed_1_open,
                                        ' - ',
                                        hours.wed_1_close
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Thursday ',
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'bold right pl2' },
                                        hours.thu_1_open,
                                        ' - ',
                                        hours.thu_1_close
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Friday ',
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'bold right pl2' },
                                        hours.fri_1_open,
                                        ' - ',
                                        hours.fri_1_close
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Saturday ',
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'bold right pl2' },
                                        hours.sat_1_open,
                                        ' - ',
                                        hours.sat_1_close
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Sunday ',
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'bold right pl2' },
                                        hours.sun_1_open,
                                        ' - ',
                                        hours.sun_1_close
                                    )
                                )
                            )]
                        )
                    )
                ),
                _react2.default.createElement(
                    'footer',
                    { className: 'center py4' },
                    _react2.default.createElement(
                        'p',
                        { className: 'mb2' },
                        name,
                        ', ',
                        new Date().getFullYear()
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'screenames flex items-baseline justify-center links' },
                        (screennames || []).filter(function (s) {
                            return ['Instagram', 'Twitter'].indexOf(s.service_name) > -1;
                        }).concat([{
                            service_name: 'Facebook',
                            value: id
                        }]).map(function (s) {
                            var IconComponent = iconComponents['' + s.service_name];
                            return _react2.default.createElement(
                                'a',
                                { href: 'http://' + s.service_name.toLowerCase() + '.com/' + s.value, className: 'inline-flex items-center mx1 screenname-btn' },
                                _react2.default.createElement(
                                    'span',
                                    { className: 'screenname-icon ml1 ' + s.service_name.toLowerCase() + '-icon' },
                                    IconComponent
                                )
                            );
                        })
                    )
                )
            );
        }
    }]);

    return Junipero;
}(_react2.default.Component);

exports.default = Junipero;
module.exports = exports['default'];