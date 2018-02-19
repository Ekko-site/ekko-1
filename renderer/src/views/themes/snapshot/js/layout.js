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

var _reactMasonryComponent = require('react-masonry-component');

var _reactMasonryComponent2 = _interopRequireDefault(_reactMasonryComponent);

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

var vals = function vals(obj) {
    return Object.keys(obj).map(function (key) {
        return obj[key];
    });
};

var Snapshot = function (_React$Component) {
    _inherits(Snapshot, _React$Component);

    function Snapshot(props) {
        _classCallCheck(this, Snapshot);

        var _this = _possibleConstructorReturn(this, (Snapshot.__proto__ || Object.getPrototypeOf(Snapshot)).call(this, props));

        _this.state = {
            currentImageIndex: 0,
            lightboxShow: false
        };
        return _this;
    }

    _createClass(Snapshot, [{
        key: 'handleMapClick',
        value: function handleMapClick(event) {
            event.target.querySelector('iframe').style.pointerEvents = 'auto';
        }
    }, {
        key: 'openLightbox',
        value: function openLightbox(index) {
            this.setState({
                currentImageIndex: index,
                lightboxShow: true
            });
        }
    }, {
        key: 'closeLightbox',
        value: function closeLightbox() {
            this.setState({
                lightboxShow: false
            });
        }
    }, {
        key: 'previousImageLightbox',
        value: function previousImageLightbox() {
            var photos = this.props.doc.data.photos;

            this.setState({
                currentImageIndex: this.state.currentImageIndex - 1 < 0 ? photos.length : --this.state.currentImageIndex
            });
        }
    }, {
        key: 'nextImageLightbox',
        value: function nextImageLightbox() {
            var photos = this.props.doc.data.photos;

            this.setState({
                currentImageIndex: this.state.currentImageIndex + 1 > photos.length - 1 ? 0 : ++this.state.currentImageIndex
            });
        }
    }, {
        key: 'getLightbox',
        value: function getLightbox() {
            var _this2 = this;

            var _props$doc$data = this.props.doc.data,
                photos = _props$doc$data.photos,
                id = _props$doc$data.id;

            var photo = photos[this.state.currentImageIndex];
            var image = photo.images[0];
            return _react2.default.createElement(
                'div',
                { className: 'lightbox-outer flex items-center justify-center px2', onClick: function onClick() {
                        return _this2.closeLightbox();
                    } },
                _react2.default.createElement(
                    'div',
                    { className: 'max-width-3 lightbox-inner', style: {
                            color: '#fff'
                        }, onClick: function onClick(e) {
                            return e.stopPropagation();
                        } },
                    _react2.default.createElement(
                        'div',
                        { className: 'flex justify-between mb2 lightbox-main-controls items-center' },
                        _react2.default.createElement(
                            'a',
                            { href: 'https://m.me/' + id, className: 'btn text-btn' },
                            'Send a Message'
                        ),
                        _react2.default.createElement(
                            'a',
                            { href: '#', className: 'btn noselect', onClick: function onClick(event) {
                                    event.preventDefault();
                                    _this2.closeLightbox();
                                } },
                            '\xD7'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'flex items-center justify-center lightbox-main-navigation' },
                        _react2.default.createElement(
                            'a',
                            { href: '#', className: 'btn noselect', style: {
                                    left: '-1rem'
                                }, onClick: function onClick(event) {
                                    event.preventDefault();
                                    _this2.previousImageLightbox();
                                } },
                            '\u2039'
                        ),
                        _react2.default.createElement('img', { src: image.source, alt: image.name, className: 'lightbox-main-img mb2' }),
                        _react2.default.createElement(
                            'a',
                            { href: '#', className: 'btn noselect', style: {
                                    right: '-1rem'
                                }, onClick: function onClick(event) {
                                    event.preventDefault();
                                    _this2.nextImageLightbox();
                                } },
                            '\u203A'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'lightbox-info-panel p3' },
                        _react2.default.createElement(
                            'p',
                            { className: 'small-heading ' + (photo.name && 'mb2') },
                            (0, _moment2.default)(photo.created_time).format('Do MMMM YYYY')
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            photo.name
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props$doc$data2 = this.props.doc.data,
                about = _props$doc$data2.about,
                cover = _props$doc$data2.cover,
                picture = _props$doc$data2.picture,
                name = _props$doc$data2.name,
                _props$doc$data2$loca = _props$doc$data2.location,
                location = _props$doc$data2$loca === undefined ? {} : _props$doc$data2$loca,
                hours = _props$doc$data2.hours,
                call_to_actions = _props$doc$data2.call_to_actions,
                events = _props$doc$data2.events,
                posts = _props$doc$data2.posts,
                phone = _props$doc$data2.phone,
                photos = _props$doc$data2.photos,
                description = _props$doc$data2.description,
                screennames = _props$doc$data2.screennames,
                emails = _props$doc$data2.emails,
                id = _props$doc$data2.id;


            var tel = phone && !phone.match(/<<not-applicable>>/i) ? phone : null;
            var showMap = !!Object.keys(location).length;
            var showPhotos = !!photos.length;

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

            var childElements = void 0;

            showPhotos && (childElements = photos.slice(0, 9).map(function (photo, index) {
                var image = photo.images[0];
                return _react2.default.createElement(
                    'li',
                    { className: 'masonry-wrap__entry' },
                    _react2.default.createElement('img', { className: '', onClick: function onClick() {
                            return _this3.openLightbox(index);
                        }, src: image.source, alt: image.name })
                );
            }));

            return _react2.default.createElement(
                'div',
                { className: 'container' },
                _react2.default.createElement(
                    'style',
                    null,
                    '@import url(https://fonts.googleapis.com/css?family=Abel|Abril+Fatface);'
                ),
                this.state.lightboxShow && this.getLightbox(),
                _react2.default.createElement(
                    'div',
                    { className: 'content ' + (this.state.lightboxShow && 'lightbox') },
                    _react2.default.createElement(
                        'header',
                        { className: 'flex py2 px3 items-center' },
                        _react2.default.createElement(
                            'div',
                            { className: 'name flex-auto' },
                            _react2.default.createElement(
                                'h1',
                                { className: 'logo' },
                                name
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'links' },
                            _react2.default.createElement(
                                'a',
                                { href: 'https://facebook.com/' + id, className: 'mr2' },
                                'Visit on Facebook'
                            ),
                            tel && _react2.default.createElement(
                                'a',
                                { href: 'tel:' + tel, className: 'mr2' },
                                'Call Now'
                            ),
                            _react2.default.createElement(
                                'a',
                                { href: 'https://m.me/' + id },
                                'Send a Message'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'hero p2', style: style.cover },
                        _react2.default.createElement(
                            'div',
                            { className: 'description center flex items-center justify-center' },
                            _react2.default.createElement(
                                'h2',
                                { className: 'billboard px2' },
                                about,
                                location.city && location.country && _react2.default.createElement(
                                    'span',
                                    null,
                                    ' in ',
                                    location.city,
                                    ', ',
                                    location.country
                                )
                            )
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
                                    { href: 'http://' + s.service_name.toLowerCase() + '.com/' + s.value, className: 'inline-flex items-center mx1 screenname-btn circle center' },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'screenname-icon ' + s.service_name.toLowerCase() + '-icon' },
                                        IconComponent
                                    )
                                );
                            })
                        )
                    ),
                    showPhotos && _react2.default.createElement(
                        'div',
                        { className: 'photographs max-width-4 mx-auto py4 px3' },
                        _react2.default.createElement(
                            'h2',
                            { className: 'section-heading center mb4' },
                            'Photographs'
                        ),
                        _react2.default.createElement(
                            _reactMasonryComponent2.default,
                            {
                                className: 'masonry-wrap' // default ''
                                , elementType: 'ul' // default 'div'
                                , options: {
                                    transitionDuration: 0
                                }
                            },
                            childElements
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'max-width-4 mx-auto py4 px3 about-container' },
                        _react2.default.createElement(
                            'h2',
                            { className: 'section-heading center mb4' },
                            'About'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'flex about' },
                            showMap && _react2.default.createElement(
                                'div',
                                { className: 'map col-8', onClick: this.handleMapClick, id: 'map' },
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
                                { className: 'contact p4 ' + (!showMap ? 'col-12' : 'col-4') },
                                showMap && _react2.default.createElement(
                                    'div',
                                    { className: 'location mb3' },
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'small-heading mb1' },
                                        'Location'
                                    ),
                                    vals(function (_ref2) {
                                        var street = _ref2.street,
                                            city = _ref2.city,
                                            country = _ref2.country,
                                            zip = _ref2.zip;
                                        return { street: street, city: city, country: country, zip: zip };
                                    }(location)).filter(Boolean).join(', ')
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'contact-info' },
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'small-heading mb1' },
                                        'Contact Info'
                                    ),
                                    tel && _react2.default.createElement(
                                        'div',
                                        { className: 'phone' },
                                        tel
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'fb-msg' },
                                        _react2.default.createElement(
                                            'a',
                                            { href: 'https://m.me/' + id },
                                            'Send Facebook Message'
                                        )
                                    ),
                                    emails && emails.length && (emails || []).map(function (e) {
                                        return _react2.default.createElement(
                                            'a',
                                            { href: 'mailto:' + e },
                                            e
                                        );
                                    })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Snapshot;
}(_react2.default.Component);

exports.default = Snapshot;
module.exports = exports['default'];