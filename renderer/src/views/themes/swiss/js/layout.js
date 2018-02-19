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

var iconComponents = {
    Twitter: _react2.default.createElement(_twitter2.default, null),
    Facebook: _react2.default.createElement(_facebook2.default, null),
    Instagram: _react2.default.createElement(_instagram2.default, null)
};

var Swiss = function (_React$Component) {
    _inherits(Swiss, _React$Component);

    function Swiss() {
        _classCallCheck(this, Swiss);

        return _possibleConstructorReturn(this, (Swiss.__proto__ || Object.getPrototypeOf(Swiss)).apply(this, arguments));
    }

    _createClass(Swiss, [{
        key: 'render',
        value: function render() {
            var _props$doc$data = this.props.doc.data,
                about = _props$doc$data.about,
                cover = _props$doc$data.cover,
                picture = _props$doc$data.picture,
                name = _props$doc$data.name,
                location = _props$doc$data.location,
                _props$doc$data$hours = _props$doc$data.hours,
                hours = _props$doc$data$hours === undefined ? {} : _props$doc$data$hours,
                call_to_actions = _props$doc$data.call_to_actions,
                events = _props$doc$data.events,
                posts = _props$doc$data.posts,
                phone = _props$doc$data.phone,
                photos = _props$doc$data.photos,
                description = _props$doc$data.description,
                screennames = _props$doc$data.screennames,
                emails = _props$doc$data.emails,
                id = _props$doc$data.id;


            var tel = phone && !phone.match(/<<not-applicable>>/i) ? phone : null;

            var showHours = !!Object.keys(hours).length;

            var descriptionElement = _react2.default.createElement(
                'div',
                { className: 'description mb3' },
                _react2.default.createElement(
                    'p',
                    null,
                    description
                )
            );

            var avatar = _react2.default.createElement(
                'div',
                { className: 'avatar mr2 mb2' },
                _react2.default.createElement('img', { className: 'circle', src: picture.url, alt: '' })
            );

            var nameParts = name.split(' ');
            var nameElement = void 0;
            if (nameParts.length == 1) {
                nameElement = nameParts[0];
            } else if (nameParts.every(function (n) {
                return n.length == 1;
            })) {
                nameElement = nameParts.join('');
            } else {
                (function () {
                    var middleIndex = Math.ceil(nameParts.length / 2);
                    nameElement = nameParts.map(function (part, index) {
                        return _react2.default.createElement(
                            'span',
                            { style: {
                                    color: index >= middleIndex ? '#000' : '#fff'
                                } },
                            part,
                            _react2.default.createElement('br', null)
                        );
                    });
                })();
            }

            return _react2.default.createElement(
                'div',
                { className: 'container' },
                _react2.default.createElement(
                    'style',
                    null,
                    '@import url(https://fonts.googleapis.com/css?family=Arapey);'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'hero p3 flex flex-column' },
                    _react2.default.createElement(
                        'div',
                        { className: 'flex flex-auto justify-between top-details' },
                        _react2.default.createElement(
                            'div',
                            { className: 'flex contact' },
                            avatar,
                            _react2.default.createElement(
                                'div',
                                { className: 'emails mr2 mb2' },
                                emails && emails.length && (emails || []).map(function (e) {
                                    return _react2.default.createElement(
                                        'a',
                                        { className: 'caps mr1', href: 'mailto:' + e },
                                        e
                                    );
                                })
                            ),
                            tel && _react2.default.createElement(
                                'div',
                                { className: 'phone' },
                                _react2.default.createElement(
                                    'a',
                                    { href: 'tel:' + tel },
                                    tel
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'screenames flex' },
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
                                        { className: 'screenname-icon ' + s.service_name.toLowerCase() + '-icon' },
                                        IconComponent
                                    )
                                );
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'flex bottom-details' },
                        _react2.default.createElement(
                            'div',
                            { className: 'page-name' },
                            _react2.default.createElement(
                                'h2',
                                { className: 'h1 right-align' },
                                nameElement
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'flex p3 meta-details' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-6 pr2' },
                        _react2.default.createElement(
                            'div',
                            { className: 'about thick-border-bottom mb3 pb1' },
                            _react2.default.createElement(
                                'h3',
                                { className: 'caps h2' },
                                about
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'flex flex-column pb4' },
                            location && _react2.default.createElement(
                                'h3',
                                { className: 'h3 one-line-address mb1' },
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
                            ),
                            descriptionElement,
                            showHours && _react2.default.createElement(
                                'div',
                                { className: 'opening-times mb1' },
                                _react2.default.createElement(
                                    'h5',
                                    { className: 'h3 mb1' },
                                    'Opening Times'
                                ),
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'list-reset' },
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        'Monday ',
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'right pl2' },
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
                                            { className: 'right pl2' },
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
                                            { className: 'right pl2' },
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
                                            { className: 'right pl2' },
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
                                            { className: 'right pl2' },
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
                                            { className: 'right pl2' },
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
                                            { className: 'right pl2' },
                                            hours.sun_1_open,
                                            ' - ',
                                            hours.sun_1_close
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Swiss;
}(_react2.default.Component);

exports.default = Swiss;
module.exports = exports['default'];