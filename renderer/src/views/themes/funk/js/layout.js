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

var Funk = function (_React$Component) {
    _inherits(Funk, _React$Component);

    function Funk(props) {
        _classCallCheck(this, Funk);

        var _this = _possibleConstructorReturn(this, (Funk.__proto__ || Object.getPrototypeOf(Funk)).call(this, props));

        _this.state = {
            showMap: false
        };
        return _this;
    }

    _createClass(Funk, [{
        key: 'toggleMap',
        value: function toggleMap() {
            this.setState({
                showMap: !this.state.showMap
            }, function () {
                var body = document.body,
                    html = document.documentElement,
                    height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                window.scrollTo(0, height);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

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
                restaurant_services = _props$doc$data.restaurant_services,
                restaurant_specialties = _props$doc$data.restaurant_specialties,
                id = _props$doc$data.id,
                screennames = _props$doc$data.screennames;


            var style = {};
            if (cover && cover.source) {
                style.cover = {
                    backgroundImage: 'url(' + cover.source + ')'
                };
            }

            var showGallery = !!(photos && photos.length);
            var showPosts = posts && posts.length;

            var vals = function vals(obj) {
                return Object.keys(obj).map(function (key) {
                    return obj[key];
                });
            };

            var showRestaurantSpecialties = restaurant_specialties && Object.keys(restaurant_specialties).some(function (key) {
                return restaurant_specialties[key];
            });

            var getRestaurantSpecialties = function getRestaurantSpecialties() {
                return Object.keys(restaurant_specialties).filter(function (key) {
                    return restaurant_specialties[key];
                }).join(', ');
            };

            var showRestaurantServices = restaurant_services && Object.keys(restaurant_services).some(function (key) {
                return restaurant_services[key];
            });

            var getServicePrefix = function getServicePrefix(service) {
                switch (service) {
                    case 'walkins':
                        return service + ' welcome';
                        break;
                    case 'groups':
                    case 'kids':
                        return 'good for ' + service;
                        break;
                    case 'outdoor':
                        return service + ' seating';
                    default:
                        return service;
                        break;
                }
            };

            var getRestaurantServices = function getRestaurantServices() {
                return Object.keys(restaurant_services).filter(function (key) {
                    return restaurant_services[key];
                }).map(function (service) {
                    return _react2.default.createElement(
                        'span',
                        { className: 'capitals' },
                        getServicePrefix(service),
                        _react2.default.createElement('br', null)
                    );
                });
            };

            var showInfoPanel = showRestaurantServices || showRestaurantSpecialties || hours;

            var tel = phone && !phone.match(/<<not-applicable>>/i) ? phone : null;

            var outputHours = function outputHours(hours) {
                var days = {
                    mon: 'Monday',
                    tue: 'Tuesday',
                    wed: 'Wednesday',
                    thu: 'Thursday',
                    fri: 'Friday',
                    sat: 'Saturday',
                    sun: 'Sunday'
                };
                return Object.keys(days).map(function (dayKey, index) {
                    return [_react2.default.createElement(
                        'div',
                        { className: 'info-panel__times__day' },
                        days[dayKey],
                        ':'
                    ), _react2.default.createElement(
                        'div',
                        { className: 'info-panel__times__hours' },
                        (!hours[dayKey + '_1_open'] || !hours[dayKey + '_1_close']) && _react2.default.createElement(
                            'span',
                            null,
                            'CLOSED'
                        ),
                        (hours[dayKey + '_1_open'] || hours[dayKey + '_1_close']) && _react2.default.createElement(
                            'span',
                            null,
                            hours[dayKey + '_1_open'],
                            ' to ',
                            hours[dayKey + '_1_close']
                        )
                    )];
                });
            };

            // Load in photo feed

            var childElements = void 0;

            showGallery && (childElements = photos.slice(0, 9).map(function (photo) {
                var image = photo.images[0];
                return _react2.default.createElement(
                    'li',
                    { className: 'masonry-wrap__entry' },
                    _react2.default.createElement('img', { src: image.source })
                );
            }));

            // Load in blog feed

            var childPostElements = void 0;
            showPosts && (childPostElements = posts.slice(0, 6).map(function (post) {
                var postId = post.id.match(/_/) ? post.id.split('_').pop() : null;
                var postURL = postId ? 'https://facebook.com/' + id + '/posts/' + postId : 'https://facebook.com/' + id;
                return _react2.default.createElement(
                    'li',
                    { className: 'masonry-wrap__entry' },
                    _react2.default.createElement(
                        'div',
                        { className: 'masonry-wrap__entry__blog' },
                        _react2.default.createElement('img', { src: post.full_picture }),
                        _react2.default.createElement(
                            'p',
                            { className: 'meta-info' },
                            (0, _moment2.default)(post.created_time).fromNow(),
                            ' \u2014 ',
                            _react2.default.createElement(
                                'a',
                                { href: postURL },
                                'View post'
                            )
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'masonry-wrap__blog-text' },
                            _react2.default.createElement(
                                _reactLinkify2.default,
                                null,
                                post.message
                            )
                        )
                    )
                );
            }));

            return _react2.default.createElement(
                'div',
                { className: 'wrap' },
                _react2.default.createElement(
                    'div',
                    { className: 'intro' },
                    _react2.default.createElement('div', { className: 'intro__bg', style: style.cover }),
                    _react2.default.createElement(
                        'header',
                        { className: 'site-header' },
                        _react2.default.createElement(
                            'div',
                            { className: 'container' },
                            _react2.default.createElement(
                                'a',
                                { href: '/', className: 'site-header__icon' },
                                _react2.default.createElement('img', { src: picture.url })
                            ),
                            tel && _react2.default.createElement(
                                'tel',
                                { className: 'site-header__phone' },
                                tel
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'container' },
                        _react2.default.createElement(
                            'div',
                            { className: 'grid' },
                            _react2.default.createElement(
                                'div',
                                { className: 'grid__item one-whole lap--four-fifths desk--three-quarters push--desk--one-twelfth' },
                                _react2.default.createElement(
                                    'h1',
                                    { className: 'headline red' },
                                    name
                                ),
                                about && _react2.default.createElement(
                                    'p',
                                    { className: 'emphasised blue-light' },
                                    about
                                )
                            )
                        )
                    )
                ),
                description && _react2.default.createElement(
                    'div',
                    { className: 'about-area' },
                    _react2.default.createElement(
                        'div',
                        { className: 'container' },
                        _react2.default.createElement(
                            'div',
                            { className: 'grid' },
                            _react2.default.createElement(
                                'div',
                                { className: 'grid__item one-whole lap--two-thirds push--lap--one-sixth desk--two-thirds push--desk--one-sixth' },
                                _react2.default.createElement(
                                    'pre',
                                    null,
                                    description
                                )
                            )
                        )
                    )
                ),
                showInfoPanel && _react2.default.createElement(
                    'div',
                    { className: 'info-panel' },
                    _react2.default.createElement(
                        'div',
                        { className: 'container' },
                        _react2.default.createElement(
                            'div',
                            { className: 'grid' },
                            _react2.default.createElement(
                                'div',
                                { className: 'grid__item one-whole' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'info-panel__wrap' },
                                    hours && _react2.default.createElement(
                                        'div',
                                        { className: 'info-panel__block' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'info-panel__times' },
                                            _react2.default.createElement(
                                                'h3',
                                                { className: 'mini-title' },
                                                'Opening times'
                                            ),
                                            outputHours(hours)
                                        )
                                    ),
                                    showRestaurantSpecialties && _react2.default.createElement(
                                        'div',
                                        { className: 'info-panel__block' },
                                        _react2.default.createElement(
                                            'h3',
                                            { className: 'mini-title' },
                                            'Specialties'
                                        ),
                                        'Serves ',
                                        getRestaurantSpecialties()
                                    ),
                                    showRestaurantServices && _react2.default.createElement(
                                        'div',
                                        { className: 'info-panel__block' },
                                        _react2.default.createElement(
                                            'h3',
                                            { className: 'mini-title' },
                                            'Services'
                                        ),
                                        getRestaurantServices()
                                    )
                                )
                            )
                        )
                    )
                ),
                !showInfoPanel && !description && _react2.default.createElement('div', { className: 'info-feed-spacer' }),
                !!events.length && _react2.default.createElement(
                    'div',
                    { className: 'upcoming-events' },
                    _react2.default.createElement(
                        'div',
                        { className: 'container' },
                        _react2.default.createElement(
                            'div',
                            { className: 'grid' },
                            _react2.default.createElement(
                                'div',
                                { className: 'grid__item palm--one-whole lap--one-quarter desk--one-quarter' },
                                _react2.default.createElement(
                                    'h2',
                                    { className: 'light-title' },
                                    events.length,
                                    ' upcoming event',
                                    events.length > 1 && 's'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'grid__item palm--one-whole lap--three-quarters desk--three-quarters' },
                                events.map(function (event) {
                                    return _react2.default.createElement(
                                        'article',
                                        null,
                                        _react2.default.createElement(
                                            'h3',
                                            { className: 'no-mb' },
                                            _react2.default.createElement(
                                                'a',
                                                { href: 'https://facebook.com/' + event.id },
                                                event.name
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'meta' },
                                            (0, _moment2.default)(event.start_time).format('dddd, Do MMMM YYYY [at] H:mm')
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            event.description.slice(0, 160),
                                            '\u2026'
                                        )
                                    );
                                })
                            )
                        )
                    )
                ),
                !!showPosts && _react2.default.createElement(
                    'div',
                    { className: 'gallery' },
                    _react2.default.createElement(
                        'div',
                        { className: 'container' },
                        _react2.default.createElement(
                            'div',
                            { className: 'grid' },
                            _react2.default.createElement(
                                'div',
                                { className: 'grid__item palm--one-whole lap--one-quarter desk--one-quarter' },
                                _react2.default.createElement(
                                    'h2',
                                    { className: 'light-title' },
                                    'News and photos'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'grid__item palm--one-whole lap--three-quarters desk--three-quarters' },
                                _react2.default.createElement(
                                    _reactMasonryComponent2.default,
                                    {
                                        className: 'masonry-wrap' // default ''
                                        , elementType: 'ul' // default 'div'
                                        , options: {
                                            transitionDuration: 0
                                        }
                                    },
                                    childPostElements
                                )
                            )
                        )
                    )
                ),
                showGallery && _react2.default.createElement(
                    'div',
                    { className: 'gallery' },
                    _react2.default.createElement(
                        'div',
                        { className: 'container' },
                        _react2.default.createElement(
                            'div',
                            { className: 'grid' },
                            _react2.default.createElement(
                                'div',
                                { className: 'grid__item palm--one-whole lap--one-quarter desk--one-quarter' },
                                _react2.default.createElement(
                                    'h2',
                                    { className: 'light-title' },
                                    'More in the gallery'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'grid__item palm--one-whole lap--three-quarters desk--three-quarters' },
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
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'footer',
                    { className: 'site-footer' },
                    _react2.default.createElement(
                        'div',
                        { className: 'container' },
                        _react2.default.createElement(
                            'div',
                            { className: 'grid' },
                            _react2.default.createElement(
                                'div',
                                { className: 'grid__item one-whole' },
                                tel && _react2.default.createElement(
                                    'p',
                                    { className: 'h2' },
                                    tel
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'emphasised blue-light' },
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'no-mb' },
                                        vals(function (_ref) {
                                            var street = _ref.street,
                                                city = _ref.city,
                                                country = _ref.country,
                                                zip = _ref.zip;
                                            return { street: street, city: city, country: country, zip: zip };
                                        }(location)).filter(Boolean).join(', ')
                                    )
                                ),
                                (location.street || location.city || location.zip) && !this.state.showMap && _react2.default.createElement(
                                    'a',
                                    { href: '#', onClick: function onClick(event) {
                                            event.preventDefault();
                                            _this2.toggleMap();
                                        }, className: 'show-map' },
                                    'View location on map'
                                ),
                                (location.street || location.city || location.zip) && this.state.showMap && _react2.default.createElement(
                                    'a',
                                    { href: '#', onClick: function onClick(event) {
                                            event.preventDefault();
                                            _this2.toggleMap();
                                        }, className: 'show-map' },
                                    'Close map'
                                ),
                                (location.street || location.city || location.zip) && this.state.showMap && _react2.default.createElement(
                                    'div',
                                    { className: 'site-footer__map' },
                                    _react2.default.createElement('iframe', { src: 'https://www.google.com/maps/embed/v1/place?key=' + API_KEY + '&q=' + vals(function (_ref2) {
                                            var street = _ref2.street,
                                                city = _ref2.city,
                                                country = _ref2.country;
                                            return { street: street, city: city, country: country };
                                        }(location)).filter(Boolean).join(', '), frameBorder: '0' })
                                ),
                                !!screennames.length && _react2.default.createElement(
                                    'p',
                                    { className: 'site-footer__social' },
                                    (screennames || []).filter(function (s) {
                                        return ['Instagram', 'Twitter'].indexOf(s.service_name) > -1;
                                    }).concat([{
                                        service_name: 'Facebook',
                                        value: id
                                    }]).map(function (s) {
                                        return _react2.default.createElement(
                                            'a',
                                            { href: 'http://' + s.service_name.toLowerCase() + '.com/' + s.value, className: 'site-footer__social__link site-footer__social__link--' + s.service_name.toLowerCase() },
                                            s.service_name
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

    return Funk;
}(_react2.default.Component);

exports.default = Funk;
module.exports = exports['default'];