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

var Standard = function (_React$Component) {
    _inherits(Standard, _React$Component);

    function Standard() {
        _classCallCheck(this, Standard);

        return _possibleConstructorReturn(this, (Standard.__proto__ || Object.getPrototypeOf(Standard)).apply(this, arguments));
    }

    _createClass(Standard, [{
        key: 'render',
        value: function render() {
            var _props$doc$data = this.props.doc.data,
                about = _props$doc$data.about,
                cover = _props$doc$data.cover,
                picture = _props$doc$data.picture,
                name = _props$doc$data.name,
                location = _props$doc$data.location,
                hours = _props$doc$data.hours,
                call_to_actions = _props$doc$data.call_to_actions,
                events = _props$doc$data.events,
                posts = _props$doc$data.posts,
                phone = _props$doc$data.phone,
                photos = _props$doc$data.photos,
                description = _props$doc$data.description,
                emails = _props$doc$data.emails,
                id = _props$doc$data.id,
                screennames = _props$doc$data.screennames;


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

            var tel = phone && !phone.match(/<<not-applicable>>/i) ? phone : null;

            return _react2.default.createElement(
                'div',
                { className: 'container' },
                _react2.default.createElement(
                    'header',
                    { className: 'masthead' },
                    _react2.default.createElement(
                        'h1',
                        null,
                        name
                    ),
                    tel && _react2.default.createElement(
                        'nav',
                        null,
                        _react2.default.createElement(
                            'ul',
                            null,
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: 'tel:' + tel },
                                    tel
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'cover-photo' },
                    _react2.default.createElement('div', { className: 'cover-photo--background', style: style.cover }),
                    _react2.default.createElement(
                        'div',
                        { className: 'cover-photo--content' },
                        _react2.default.createElement('img', { className: 'profile-picture', src: picture.url, alt: '' }),
                        _react2.default.createElement(
                            'p',
                            null,
                            about
                        ),
                        location && _react2.default.createElement(
                            'p',
                            { className: 'sub-text' },
                            location.street && _react2.default.createElement(
                                'span',
                                null,
                                location.street,
                                ', ',
                                location.city
                            ),
                            !location.street && _react2.default.createElement(
                                'span',
                                null,
                                location.city
                            )
                        )
                    )
                ),
                (hours || location || emails) && _react2.default.createElement(
                    'aside',
                    { className: 'info-sidebar' },
                    hours && _react2.default.createElement(
                        'section',
                        null,
                        _react2.default.createElement(
                            'header',
                            null,
                            _react2.default.createElement(
                                'h1',
                                null,
                                'Opening Hours'
                            )
                        ),
                        _react2.default.createElement(
                            'ul',
                            { className: 'list-reset hours' },
                            _react2.default.createElement(
                                'li',
                                null,
                                'Monday ',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'bold right pl2 hours-unit' },
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
                                    { className: 'bold right pl2 hours-unit' },
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
                                    { className: 'bold right pl2 hours-unit' },
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
                                    { className: 'bold right pl2 hours-unit' },
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
                                    { className: 'bold right pl2 hours-unit' },
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
                                    { className: 'bold right pl2 hours-unit' },
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
                                    { className: 'bold right pl2 hours-unit' },
                                    hours.sun_1_open,
                                    ' - ',
                                    hours.sun_1_close
                                )
                            )
                        )
                    ),
                    emails && _react2.default.createElement(
                        'section',
                        null,
                        _react2.default.createElement(
                            'header',
                            null,
                            _react2.default.createElement(
                                'h1',
                                null,
                                'Email address'
                            )
                        ),
                        emails.map(function (email) {
                            return _react2.default.createElement(
                                'p',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: 'mailto:' + email },
                                    email
                                )
                            );
                        })
                    ),
                    location && _react2.default.createElement(
                        'section',
                        null,
                        _react2.default.createElement(
                            'header',
                            null,
                            _react2.default.createElement(
                                'h1',
                                null,
                                'Address'
                            )
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            [location.street, location.city, location.country, location.zip].filter(Boolean).join(', ')
                        ),
                        location.street && _react2.default.createElement('iframe', {
                            className: 'ml1', src: 'https://www.google.com/maps/embed/v1/place?key=' + API_KEY + '&q=' + (location.street || '') + ', ' + location.city + ', ' + location.zip, frameBorder: '0' })
                    )
                ),
                _react2.default.createElement(
                    'section',
                    { className: 'content' },
                    _react2.default.createElement(
                        'div',
                        { className: 'intro' },
                        _react2.default.createElement(
                            'header',
                            null,
                            _react2.default.createElement(
                                'h1',
                                null,
                                'About ',
                                name
                            )
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            description
                        )
                    ),
                    !!events && !!events.length && _react2.default.createElement(
                        'div',
                        { className: 'events' },
                        _react2.default.createElement(
                            'header',
                            null,
                            _react2.default.createElement(
                                'h1',
                                null,
                                'Events'
                            )
                        ),
                        events && events.map(function (event) {
                            return _react2.default.createElement(
                                'article',
                                null,
                                _react2.default.createElement('img', { src: event.cover.source, alt: '' }),
                                _react2.default.createElement(
                                    'h2',
                                    null,
                                    event.name
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'meta-info' },
                                    'At ',
                                    event.place.name,
                                    ', on ',
                                    (0, _moment2.default)(event.start_time).format('MMMM Do YYYY [at] h:mm:ss a')
                                ),
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    event.description
                                )
                            );
                        })
                    ),
                    !!posts && !!posts.length && _react2.default.createElement(
                        'div',
                        { className: 'latest-posts' },
                        _react2.default.createElement(
                            'header',
                            null,
                            _react2.default.createElement(
                                'h1',
                                null,
                                'Latest Posts'
                            )
                        ),
                        posts && posts.map(function (post, index) {
                            return _react2.default.createElement(
                                'article',
                                null,
                                _react2.default.createElement(
                                    'p',
                                    { className: 'meta-info' },
                                    (0, _moment2.default)(post.created_time).fromNow()
                                ),
                                _react2.default.createElement(
                                    _reactLinkify2.default,
                                    null,
                                    _react2.default.createElement(
                                        'p',
                                        null,
                                        post.message
                                    )
                                ),
                                _react2.default.createElement('img', { src: post.full_picture, alt: '' })
                            );
                        })
                    )
                ),
                _react2.default.createElement(
                    'footer',
                    { className: 'primary-footer flex justify-between' },
                    _react2.default.createElement(
                        'p',
                        null,
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

    return Standard;
}(_react2.default.Component);

exports.default = Standard;
module.exports = exports['default'];