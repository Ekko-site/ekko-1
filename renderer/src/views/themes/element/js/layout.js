'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('./../../components');

var _components2 = _interopRequireDefault(_components);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var About = _components2.default.About,
    Cta = _components2.default.Cta,
    Events = _components2.default.Events,
    Hours = _components2.default.Hours,
    Location = _components2.default.Location,
    Name = _components2.default.Name,
    Phone = _components2.default.Phone,
    Photos = _components2.default.Photos,
    Posts = _components2.default.Posts;


var style = {
    wrap: {
        borderColor: 'rgba(0,0,0,0.1)'
    }
};

var Element = function (_React$Component) {
    _inherits(Element, _React$Component);

    function Element() {
        _classCallCheck(this, Element);

        return _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).apply(this, arguments));
    }

    _createClass(Element, [{
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
                id = _props$doc$data.id,
                emails = _props$doc$data.emails;


            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_header2.default, { cover: cover, picture: picture, name: name, phone: phone, callToActions: call_to_actions }),
                _react2.default.createElement(
                    'div',
                    { className: 'max-width-4 mx-auto px4 pt4 pb2 bg-white border mb4', style: style.wrap },
                    _react2.default.createElement(About, { about: about, description: description, emails: emails }),
                    (location && location.street || hours) && _react2.default.createElement(
                        'div',
                        { className: 'flex mx-auto max-width-4 justify-center border-bottom pb4 location-hours', style: style.wrap },
                        _react2.default.createElement(Location, { location: location }),
                        _react2.default.createElement(Hours, { hours: hours })
                    ),
                    _react2.default.createElement(Events, { events: events }),
                    _react2.default.createElement(Posts, { posts: posts }),
                    _react2.default.createElement(_footer2.default, { about: about, facebook: id })
                )
            );
        }
    }]);

    return Element;
}(_react2.default.Component);

exports.default = Element;
module.exports = exports['default'];