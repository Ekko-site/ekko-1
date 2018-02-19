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

var fbImage = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABIZJREFUaAXtWt2LFEcQr56v3Tsw6rmnYh6ihrvThIQgMSF+YCAPK5yHJMGXJIgiQshTngJ58CUvgi95yB+QD8hLEhMSPchFJCYXxYtgVAhIjkQOc37s7Z2nHt7uzHR3qmadcXbtWfuWzNwK27BMT01116+qq2p6uhbgMW8sCX9xz489VZ+t4cx1kniyoJvScXOWvDby9c4ZlbyHFHh16NgGZtsfCCmLwKAXpLBUAzOjMcMHCVMGYyOSeUdOHR26HJddp8D23ceLlml/wUxrpeAuSCnjvIvWZ4yBYTpoS7/kg7d39OiukRBMpMC214f7LWacZswsCOGFz9vqahg2GpWXfSm2/vbd4F8EzggRmgw+NMxc24InnGRYXIkCYQ1xBwpQwKKf7RS8GtLb9kquTViLRcSMLVBg3uVPIrW3XXy+mfXuYyxUu/01kQLSFDYAi9yp2QRt8szkTAbpfVFSJCU3nwvgHDuU6KJUUjOPhU5uWXr2zFwB1xOQz5nwTH8P9K1/Anp78uA4cbAMLvw5DaNnb2gpkakCritg0/Mr4N29G+DZgeWA6V3ZbIvBz6evowLKx3VEDZY6/pZvPLT8pudWwJFDm6G7q7lYzxfacuJrpz1ooYzk8+Qm7+3f+EjwC507EwUoYAeeXgYb+5Zp4dMNYJqs+VpqiXs0E2WbfgxYlc9TUA+fuArjV27jNgETEsbFPxN3wW63LFTAbKNq5y+V4fAnF8EwHkR0W6ZR21Z768ysCyaCz2FqbaWpZ21lphbHPLB7axOkFgO0Z/F8es0CkJ9zUes3whRIp+eswYXiLtU4Jn6figI+Bm3fuiVw4K2BQBaBXP/UkrjcqP/iCwX4+KOX62Lg5Og1GDk1CU6C20WDsZOKAgR4+dIcbHtpVVyWsr+qtwvoF29nzt3Evb96xeJ81E8tBnQBNAKiVDrx71wQ2I3PVPepKaASpkO7N+9DqVzBLy+98E5NAdVLS0eBmdkqzN52AU8hdNjTiQF6i45fuQPvHzobgKAs8+bgWnhte/ARVQds7PwUfP7VeBSwc/fw3AE3c5r401GAhN+d8+D3C+UAbKXKYctmdUCXpytASoQvMsqmbbEXorMcx665AQU0vW1VjfI9pUudlKkcryI+TrTUgjgrI3QUyMrSSXI6K5BkmazonRXIytJJcjorkGSZrOidFcjK0klyghVgnGNRTOofSCbN1oSetL/X/XhvmJrXMN//Jvac/KTD+RQDtjqNKg3tNL//aQLG/igF5YAQDO1Pp29VIenMKOSLX2mXixjLXZX8JNGjPe6ON4Y/Nc2ufdyfj/P/b306XlQdrdAK0EmcbjOtPBZGKp/98u3gfhoTBTHOf1j41TKVMtNoJoIM9/3x60LAEzYs8pUJa4gxUoDqrlidfxtDoURasqBkRpZZ/B9hIUzoOyXO+TthjZiUqDuQnLj85d/r+vYcEwbrRtgrETse2MhIyVDrTK+M4V8N2E0mxTfS8w7++sPQWFw+mVfZXsHacc738c8etWqgkikDosXsKtZGrif92SMDCOmK+A8yYWvI0azUBAAAAABJRU5ErkJggg==";

var fbBWImage = "iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAy5JREFUWAntWT1rYkEUHX0vQRZkDQuaymoRImixsmlWSJtqt9KfIFhaio2pLS2ElHZqZ2NjtaXEXQiENKmCiLFwDYqIUbP3DBl39vk+FJ+awoFxvueeOffeN8PVwTQpkUgcDQaDj4qiHGmGttqczWYvbrf7+fr6+kUW5BCNcrmsVCqVc4fD8YX6Tigr8/lcDG+1dDqd2H9G+c/r6+uvWCzWiMfjaDMOMJvNqvf399+JtTBA7QoYAMgJQJGJzduzs7Mq4ZoqmODz+c4J3LfpdMroBPKandYhG+Soqurrdruju7u7lgKbG41GP0i1H/YJTssEsXgSjUZ/O+EQRKtnX2rVAkMbWICJY4O3Uge3Ur3J++oDJmBTtw0AbMC231jhTiDLJHuTm0t189Gl6et1TCYT5vF4WCQSYYFAgNdlQA8PD6xUKsEpDDc2HjFcstoAwIXDYZZMJtnp6anuIjNgYsFWAEKdXq+XpVIpzpoQpi2hequ0FecAexcXF6bgAGxvDEJwMBhcImc8HrNGo8H6/T53llarteQ02kW2qxjqPT4+1mWvXq+zQqGwYA7XGuaaJdsBQhgE66mv1+vxfpfLZYbpvzHbAII5kQHQKMExZOfQO4i81haAQq1+v3/Bnp7q4NmwTTFGbwBmZYe2AcQH+erqaiFcZkHULy8vGbJIsMl8Ps/MVG6sC7HLGiWYXCe1223L6bYCNLM9PSQAaLXGFhUL4bApwaKe2mQHQf3p6Wk3AOGJ+IRkMhmOFe10Or10B1erVVar1bid4iD4YO/Ei4EKAjudzgKg/CnhnfQzHA75HOHFVuCwzlYVQyCAGgmGvSEbjYuDyKWtTiJvbFf9AHBTJg8MHhjclIFN1x9s8N0yuM5tYXYIFZFNun7wkOOhOLPJq47J97K8Bnex1fNKzAcmYFMRdqWXSJ9O/Akbb5oAAPvkcrklMHhAiIeCmRzsQXP79Ep/VprN5jwUCiGS9NkOgEIwwGizGLMqCQum/CwWi4/ciyncekPRgFvYzaoqsBKCfbR5lTXA8BYCvsH8RRCdAtcKbfiVoqwR6t9rEJ3kNyig/y+IDqQivbe/If4CE91gp3aUEu4AAAAASUVORK5CYII=";

var phoneImage = "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAjVJREFUSA21ls9LVUEUx999YJogz4WBbhJMbKE9MAzcR1BQREt3LtLauRbDRavciYK8Tf0NbdwIrfqxLAgjglJIaGGI4o9In3r7nPfuwHTvzJ25r+nAhztz5nvO9717uTO3VLJEHMcVuAODFkn4NGYj8B4kduBBeJdUR0xuwQ/QY5fJSEoabkrzcdjTHbXxK8Zt4dySTjTtgo+akWk4/T+MH5ucUrkN5t3BzGlWhjcpE9v0XgjjctKkl+uwZ8M+T12uTBlLs0qusrn4i8tbD51ToozbUUYO9RHrU1EUfXLo/Jd5mFU4tT1U8l/hpn9HTyVNe2AbTCH5q56tvGXqVu9QsW6p+sDt/WJZazndMKZxTIdVS5c+/nH4HUuZ0bwfTNulPPvwz1cZyxWDGpjiNckLujbomOZXQE4iU8wFNUs3w3HW5EruN9xN64PNaX4R3oEpfpK84TJDIyfdJZcus07RNZAvD1N8JzmaKUoSrM2AnGLy/r+EMZvWmKdgAs7AFPKFclsvZB7BokG8T+6hrnWOKZg3NFKpYwZLMAbyjfYc8uIpi67zoPmbRAgred1Yk7ty4tCo5WfOf6sEVLTBC1X5j9dz6hubkdqrlU/mynZaJ/kIapnF4gm51dcLlfFL5bY/gTq0GlsUDhUyVmIK74O8LkXjMwVV1aelKw3kxFqGA/CJNUT9LZmZimg2DAuwDrKl6nHIRL5cJyFzrPq9VyZXLUfjDqYDcBk64QA24Vty1jP8O/4AdWohSuE+fb0AAAAASUVORK5CYII=";

var Kendrick = function (_React$Component) {
    _inherits(Kendrick, _React$Component);

    function Kendrick() {
        _classCallCheck(this, Kendrick);

        return _possibleConstructorReturn(this, (Kendrick.__proto__ || Object.getPrototypeOf(Kendrick)).apply(this, arguments));
    }

    _createClass(Kendrick, [{
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
                events = _props$doc$data.events,
                posts = _props$doc$data.posts,
                phone = _props$doc$data.phone,
                photos = _props$doc$data.photos,
                description = _props$doc$data.description,
                screennames = _props$doc$data.screennames,
                emails = _props$doc$data.emails,
                id = _props$doc$data.id;


            var tel = phone && !phone.match(/<<not-applicable>>/i) ? phone : null;

            var showMap = location.street;
            var showAbout = description;
            var showHours = !!Object.keys(hours).length;
            var showLocation = !!Object.keys(location).length;
            var showEvents = !!events.length;

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
            var weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            var currentWeekday = weekdays[new Date().getDay()];

            var firstPost = posts.length ? posts[0] : null;
            var firstPostId = void 0,
                firstPostURL = void 0;
            if (firstPost) {
                firstPostId = firstPost.id.match(/_/) ? firstPost.id.split('_').pop() : null;
                firstPostURL = firstPostId ? 'https://facebook.com/' + id + '/posts/' + firstPostId : 'https://facebook.com/' + id;
                posts.shift();
            }
            var showPosts = !!posts.length;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'container header relative', style: style.cover },
                    _react2.default.createElement(
                        'style',
                        null,
                        '@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,600|Raleway:300,400,900); @import url(https://npmcdn.com/basscss@8.0.1/css/basscss.min.css);'
                    ),
                    _react2.default.createElement('div', { className: 'overlay absolute' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'clearfix thin navigation' },
                        _react2.default.createElement(
                            'div',
                            { className: 'sm-col sm-col-3' },
                            _react2.default.createElement(
                                'span',
                                { className: 'logo-ident' },
                                name
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'sm-col sm-col-9 right nav' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'flex flex-auto list-reset right' },
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
                                        'find us'
                                    )
                                ),
                                tel && _react2.default.createElement(
                                    'li',
                                    { className: 'bold phone', style: {
                                            backgroundImage: 'url(data:image/png;base64,' + phoneImage + ')'
                                        } },
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
                        { className: 'clearfix h70 flex flex-column justify-center relative' },
                        _react2.default.createElement(
                            'div',
                            { className: 'sm-col sm-col-10' },
                            _react2.default.createElement(
                                'h1',
                                null,
                                'We\'re ',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'page-name' },
                                    name
                                )
                            )
                        )
                    )
                ),
                showAbout && _react2.default.createElement(
                    'div',
                    { className: 'container about', id: 'about' },
                    _react2.default.createElement(
                        'div',
                        { className: 'clearfix' },
                        _react2.default.createElement(
                            'div',
                            { className: 'sm-col sm-col-4' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'About'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'sm-col sm-col-8' },
                            _react2.default.createElement(
                                'p',
                                null,
                                description
                            )
                        )
                    )
                ),
                (showPosts || firstPost) && _react2.default.createElement(
                    'div',
                    { className: 'container latest', id: 'posts' },
                    _react2.default.createElement(
                        'div',
                        { className: 'clearfix' },
                        _react2.default.createElement(
                            'div',
                            { className: 'sm-col sm-col-4' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'Latest'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'sm-col sm-col-8' },
                            _react2.default.createElement(
                                'p',
                                null,
                                'Read live updates from the team at ',
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    name
                                ),
                                '.'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'sm-col sm-col-12 post top-post flex relative' },
                            firstPost.full_picture && _react2.default.createElement('div', { className: 'sm-col sm-col-6 photo', style: {
                                    backgroundImage: 'url(' + firstPost.full_picture + ')'
                                } }),
                            _react2.default.createElement(
                                'div',
                                { className: 'sm-col sm-col-' + (firstPost.full_picture ? '6' : '12') + ' flex flex-column justify-center py2' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'time-stamp clear' },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'time' },
                                        (0, _moment2.default)(firstPost.created_time).fromNow(),
                                        ' via'
                                    ),
                                    _react2.default.createElement('a', { className: 'fb-logo', style: {
                                            backgroundImage: 'url(data:image/png;base64,' + fbImage + ')'
                                        }, href: firstPostURL })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'description clear' },
                                    _react2.default.createElement(
                                        'p',
                                        null,
                                        _react2.default.createElement(
                                            _reactLinkify2.default,
                                            { className: 'post-message' },
                                            firstPost.message
                                        )
                                    )
                                )
                            )
                        ),
                        posts.map(function (post, index) {
                            var lastPost = index == posts.length - 1;
                            var postId = post.id.match(/_/) ? post.id.split('_').pop() : null;
                            var postURL = postId ? 'https://facebook.com/' + id + '/posts/' + postId : 'https://facebook.com/' + id;
                            return _react2.default.createElement(
                                'div',
                                { className: 'sm-col sm-col-12 post flex relative ' + (lastPost && 'last-post') },
                                post.full_picture && _react2.default.createElement('div', { className: 'sm-col sm-col-3 photo small', style: {
                                        backgroundImage: 'url(' + post.full_picture + ')'
                                    } }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'sm-col sm-col-' + (post.full_picture ? '9' : '12') + ' flex flex-column justify-center' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'time-stamp' },
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'time' },
                                            (0, _moment2.default)(post.created_time).fromNow(),
                                            ' via'
                                        ),
                                        _react2.default.createElement('a', { className: 'fb-logo', style: {
                                                backgroundImage: 'url(data:image/png;base64,' + fbImage + ')'
                                            }, href: postURL })
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        null,
                                        _react2.default.createElement(
                                            _reactLinkify2.default,
                                            { className: 'post-message' },
                                            post.message
                                        )
                                    )
                                ),
                                lastPost && _react2.default.createElement(
                                    'a',
                                    { href: 'https://facebook.com/' + id + '/posts', className: 'button absolute fb-external-link' },
                                    'See all posts on Facebook'
                                )
                            );
                        })
                    )
                ),
                showEvents && _react2.default.createElement(
                    'div',
                    { className: 'container events' },
                    _react2.default.createElement(
                        'div',
                        { className: 'clearfix' },
                        _react2.default.createElement(
                            'div',
                            { className: 'sm-col sm-col-12' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'What\'s on?'
                            )
                        ),
                        events.map(function (event) {
                            return _react2.default.createElement(
                                'div',
                                { className: 'sm-col sm-col-4 event px2' },
                                _react2.default.createElement(
                                    'p',
                                    { className: 'title' },
                                    event.name
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'date' },
                                    'On ',
                                    (0, _moment2.default)(event.start_time).format('dddd, Do MMMM YYYY [at] H:mm')
                                ),
                                _react2.default.createElement('div', { className: 'seperator' }),
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    _react2.default.createElement(
                                        _reactLinkify2.default,
                                        { className: 'event-description' },
                                        event.description
                                    )
                                ),
                                _react2.default.createElement(
                                    'a',
                                    { className: 'button see-more', href: 'https://facebook.com/' + event.id },
                                    'Join on Facebook'
                                )
                            );
                        })
                    )
                ),
                (showMap || showHours) && _react2.default.createElement(
                    'div',
                    { className: 'container other-information' },
                    _react2.default.createElement(
                        'div',
                        { className: 'clearfix' },
                        showMap && _react2.default.createElement(
                            'div',
                            { className: 'sm-col sm-col-' + (showHours ? '8' : '12') + ' map' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'Find Us'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'map google-map', id: 'map' },
                                _react2.default.createElement('iframe', {
                                    style: {
                                        width: '100%'
                                    },
                                    src: 'https://www.google.com/maps/embed/v1/place?key=' + API_KEY + '&q=' + (location.street || '') + ', ' + location.city + ', ' + location.zip, frameBorder: '0' })
                            )
                        ),
                        showHours && _react2.default.createElement(
                            'div',
                            { className: 'sm-col sm-col-' + (!showMap ? '12' : '4') + ' times' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'Opening Times'
                            ),
                            _react2.default.createElement(
                                'ul',
                                { className: 'list-reset times' },
                                _react2.default.createElement(
                                    'li',
                                    { className: '' + (currentWeekday == 'monday' ? 'highlight' : '') },
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
                                    { className: '' + (currentWeekday == 'tuesday' ? 'highlight' : '') },
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
                                    { className: '' + (currentWeekday == 'wednesday' ? 'highlight' : '') },
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
                                    { className: '' + (currentWeekday == 'thursday' ? 'highlight' : '') },
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
                                    { className: '' + (currentWeekday == 'friday' ? 'highlight' : '') },
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
                                    { className: '' + (currentWeekday == 'saturday' ? 'highlight' : '') },
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
                                    { className: '' + (currentWeekday == 'sunday' ? 'highlight' : '') },
                                    'Sunday ',
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'bold right pl2' },
                                        hours.sun_1_open,
                                        ' - ',
                                        hours.sun_1_close
                                    )
                                )
                            )
                        )
                    )
                ),
                (tel || emails) && _react2.default.createElement(
                    'div',
                    { className: 'container contact' },
                    _react2.default.createElement(
                        'div',
                        { className: 'clearfix' },
                        _react2.default.createElement(
                            'div',
                            { className: 'sm-col sm-col-12' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'Get in touch'
                            ),
                            tel && _react2.default.createElement(
                                'p',
                                { className: 'tel' },
                                tel
                            ),
                            emails && emails.map(function (email) {
                                return _react2.default.createElement(
                                    'a',
                                    { className: 'mail', href: 'mailto:' + email },
                                    email
                                );
                            })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'container footer' },
                    _react2.default.createElement(
                        'div',
                        { className: 'clearfix' },
                        _react2.default.createElement(
                            'div',
                            { className: 'sm-col sm-col-6' },
                            _react2.default.createElement(
                                'p',
                                null,
                                name,
                                ', ',
                                new Date().getFullYear()
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'sm-col sm-col-6' },
                            _react2.default.createElement('a', { className: 'fb-logo bw', style: {
                                    backgroundImage: 'url(data:image/png;base64,' + fbBWImage + ')'
                                }, href: 'http://facebook.com/' + id })
                        )
                    )
                )
            );
        }
    }]);

    return Kendrick;
}(_react2.default.Component);

exports.default = Kendrick;
module.exports = exports['default'];