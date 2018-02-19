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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var API_KEY = 'AIzaSyCPuOwTgswye73SH5wa_5mlCgOYorCR3fY';

var vals = function vals(obj) {
    return Object.keys(obj).map(function (key) {
        return obj[key];
    });
};

var Arlo = function (_React$Component) {
    _inherits(Arlo, _React$Component);

    function Arlo(props) {
        _classCallCheck(this, Arlo);

        var _this = _possibleConstructorReturn(this, (Arlo.__proto__ || Object.getPrototypeOf(Arlo)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Arlo, [{
        key: 'handleMapClick',
        value: function handleMapClick(event) {
            event.target.querySelector('iframe').style.pointerEvents = 'auto';
        }
    }, {
        key: 'render',
        value: function render() {
            var _props$doc$data = this.props.doc.data,
                about = _props$doc$data.about,
                cover = _props$doc$data.cover,
                picture = _props$doc$data.picture,
                name = _props$doc$data.name,
                _props$doc$data$locat = _props$doc$data.location,
                location = _props$doc$data$locat === undefined ? {} : _props$doc$data$locat,
                hours = _props$doc$data.hours,
                call_to_actions = _props$doc$data.call_to_actions,
                events = _props$doc$data.events,
                posts = _props$doc$data.posts,
                phone = _props$doc$data.phone,
                photos = _props$doc$data.photos,
                description = _props$doc$data.description,
                screennames = _props$doc$data.screennames,
                emails = _props$doc$data.emails,
                id = _props$doc$data.id;


            var style = {};
            if (cover.source) {
                style.cover = {
                    backgroundImage: 'linear-gradient(\n                    rgba(72, 94, 242, 0.95),\n                    rgba(72, 94, 242, 0.95)\n                ), url(' + cover.source + ')'
                };
            } else {
                style.cover = {
                    backgroundColor: 'rgb(72, 94, 242)'
                };
            }

            var tel = phone && !phone.match(/<<not-applicable>>/i) ? phone : null;
            var showMap = !!Object.keys(location).length;
            var showPosts = !!posts.length;
            var showCover = !!cover.source;

            return _react2.default.createElement(
                'div',
                { className: 'container mx-auto' },
                _react2.default.createElement(
                    'div',
                    { className: 'content' },
                    _react2.default.createElement(
                        'header',
                        { className: 'flex p2 items-center' },
                        _react2.default.createElement(
                            'div',
                            { className: 'flex items-center flex-auto' },
                            _react2.default.createElement(
                                'div',
                                { className: 'profile-picture mr2' },
                                _react2.default.createElement('img', { src: picture.url, alt: '' })
                            ),
                            _react2.default.createElement(
                                'h4',
                                { className: 'h4' },
                                about
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'links' },
                            tel && _react2.default.createElement(
                                'a',
                                { href: 'tel:' + tel },
                                tel
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'hero' },
                        _react2.default.createElement(
                            'div',
                            { className: 'name-cover flex justify-center items-center flex-column px2 py4', style: style.cover },
                            _react2.default.createElement(
                                'h1',
                                { className: 'h1 name mb2' },
                                name
                            ),
                            _react2.default.createElement(
                                'pre',
                                { className: 'center description max-width-3' },
                                description.trim()
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'flex map-contact', style: {
                                    height: '' + (showMap ? '420px' : 'auto')
                                } },
                            showMap && _react2.default.createElement(
                                'div',
                                { className: 'map col-6', onClick: this.handleMapClick, id: 'map' },
                                _react2.default.createElement('iframe', {
                                    src: 'https://www.google.com/maps/embed/v1/place?key=' + API_KEY + '&q=' + vals(function (_ref) {
                                        var street = _ref.street,
                                            city = _ref.city,
                                            country = _ref.country;
                                        return { street: street, city: city, country: country };
                                    }(location)).filter(Boolean).join(', '), frameBorder: '0' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'col-' + (showMap ? '6' : '12') + ' flex flex-column items-center justify-center px2 py4', style: {
                                        background: 'rgb(246, 247, 249)'
                                    } },
                                _react2.default.createElement(
                                    'p',
                                    { className: 'mb2 address' },
                                    vals(function (_ref2) {
                                        var street = _ref2.street,
                                            city = _ref2.city,
                                            country = _ref2.country;
                                        return { street: street, city: city, country: country };
                                    }(location)).filter(Boolean).join(', ')
                                ),
                                _react2.default.createElement(
                                    'a',
                                    { className: 'btn', href: 'https://m.me/' + id },
                                    'Get in touch'
                                )
                            )
                        )
                    ),
                    showPosts && _react2.default.createElement(
                        'div',
                        { className: 'posts flex flex-column px2 py4' },
                        _react2.default.createElement(
                            'div',
                            { className: 'flex mb4 posts-wrap justify-center' },
                            posts.slice(0, 3).map(function (post, index) {
                                var postId = post.id.match(/_/) ? post.id.split('_').pop() : null;
                                var postURL = postId ? 'https://facebook.com/' + id + '/posts/' + postId : 'https://facebook.com/' + id;
                                var text = _react2.default.createElement(
                                    'div',
                                    { className: 'p1' },
                                    _react2.default.createElement(
                                        'a',
                                        { href: postURL, className: 'post-created mb2 block' },
                                        (0, _moment2.default)(post.created_time).fromNow()
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'post-message' },
                                        '"',
                                        _react2.default.createElement(
                                            _reactLinkify2.default,
                                            null,
                                            post.message
                                        ),
                                        '"'
                                    )
                                );
                                var img = post.full_picture ? _react2.default.createElement(
                                    'div',
                                    { className: 'post-picture mb2' },
                                    _react2.default.createElement('img', { className: '', src: post.full_picture, alt: '' })
                                ) : null;
                                return _react2.default.createElement(
                                    'div',
                                    { className: 'flex flex-column col-4 post px2' },
                                    [img, text]
                                );
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'center' },
                            _react2.default.createElement(
                                'a',
                                { className: 'btn', href: 'https://facebook.com/' + id + '/posts' },
                                'View more posts on Facebook'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'footer',
                    { className: 'mt4 px2 py4 flex flex-column items-center justify-center' },
                    _react2.default.createElement(
                        'div',
                        { className: 'screenames flex mb2' },
                        (screennames || []).filter(function (s) {
                            return ['Instagram', 'Twitter'].indexOf(s.service_name) > -1;
                        }).concat([{
                            service_name: 'Facebook',
                            value: id
                        }]).map(function (s) {
                            return _react2.default.createElement('a', { href: 'http://' + s.service_name.toLowerCase() + '.com/' + s.value, className: 'inline-flex items-center mx1 screenname-btn icon-' + s.service_name.toLowerCase() });
                        })
                    ),
                    emails && emails.map(function (email) {
                        return _react2.default.createElement(
                            'a',
                            { className: 'bold text-decoration-none', href: 'mailto:' + email },
                            email
                        );
                    })
                )
            );
        }
    }]);

    return Arlo;
}(_react2.default.Component);

exports.default = Arlo;
module.exports = exports['default'];