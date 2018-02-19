'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _name = require('./../../components/name');

var _name2 = _interopRequireDefault(_name);

var _profilePicture = require('./../../components/profile-picture');

var _profilePicture2 = _interopRequireDefault(_profilePicture);

var _phone = require('./../../components/phone');

var _phone2 = _interopRequireDefault(_phone);

var _cta = require('./../../components/cta');

var _cta2 = _interopRequireDefault(_cta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var cover = _ref.cover,
        _ref$picture = _ref.picture,
        picture = _ref$picture === undefined ? {} : _ref$picture,
        name = _ref.name,
        phone = _ref.phone,
        callToActions = _ref.callToActions;


    var styles = {
        header: {
            overflow: 'hidden'
        },
        name: {
            borderWidth: '5px'
        },
        phone: {
            borderWidth: '5px'
        },
        blur: {
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            bottom: '-10px',
            right: '-10px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundColor: '#1c1c1c',
            WebkitFilter: 'blur(4px)',
            backgroundImage: cover ? 'linear-gradient(\n                                  rgba(0,0,0,0.4),\n                                  rgba(0,0,0,0.1)\n                              ),\n                              url(' + cover.source + ')' : 'none',
            zIndex: '-1'
        }
    };

    var tel = phone && !phone.match(/<<not-applicable>>/i) ? phone : null;

    return _react2.default.createElement(
        'header',
        { style: styles.header, className: 'px2 py4 center mb4 relative border' },
        _react2.default.createElement('div', { style: styles.blur }),
        _react2.default.createElement(
            'div',
            { className: 'flex flex-column items-center mx-auto max-width-4' },
            _react2.default.createElement(_name2.default, { name: name, style: styles.name, className: 'py1 px2 border bg-black inline-block mx-auto mb4' }),
            _react2.default.createElement(_profilePicture2.default, { picture: picture.url }),
            tel && _react2.default.createElement(_phone2.default, { phone: tel, style: styles.phone, className: 'py1 px2 border bg-black bold white' })
        )
    );
};

module.exports = exports['default'];