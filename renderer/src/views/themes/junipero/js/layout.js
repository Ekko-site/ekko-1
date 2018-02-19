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
                location = _props$doc$data.location,
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
            if (cover && cover.source) {
                style.cover = {
                    backgroundImage: 'url(' + cover.source + ')'
                };
            } else {
                style.cover = {
                    background: '#2C3437'
                };
            }

            return _react2.default.createElement(
                'div',
                { style: style.cover, className: 'container' },
                _react2.default.createElement(
                    'style',
                    null,
                    '@import url(https://fonts.googleapis.com/css?family=Lato|PT+Serif);'
                ),
                _react2.default.createElement('div', { className: 'bg-gradient' }),
                _react2.default.createElement(
                    'div',
                    { className: 'inner-wrap max-width-3 mx-auto flex flex-column justify-center px2 py4' },
                    _react2.default.createElement(
                        'div',
                        { className: 'avatar mb4 center' },
                        _react2.default.createElement('img', { className: 'circle', src: picture.url, alt: '' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'page-name center mb1' },
                        _react2.default.createElement(
                            'h2',
                            { className: 'white h1' },
                            name
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'about center mb4' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'caps h3' },
                            about
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'description center mb4' },
                        _react2.default.createElement(
                            'p',
                            null,
                            description
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'emails mb3 center' },
                        emails && emails.length && _react2.default.createElement(
                            'p',
                            null,
                            'Contact me at ',
                            (emails || []).map(function (e) {
                                return _react2.default.createElement(
                                    'a',
                                    { href: 'mailto:' + e },
                                    e
                                );
                            })
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
                                { href: 'http://' + s.service_name.toLowerCase() + '.com/' + s.value, className: 'inline-flex items-center mx1 screenname-btn' },
                                s.service_name == 'Facebook' && _react2.default.createElement(
                                    'span',
                                    null,
                                    name
                                ),
                                s.service_name !== 'Facebook' && _react2.default.createElement(
                                    'span',
                                    null,
                                    '@',
                                    s.value
                                ),
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