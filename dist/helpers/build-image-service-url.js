'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (url) {
	var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var defaultOptions = {
		source: 'next',
		fit: 'scale-down',
		compression: 'best'
	};
	var options = Object.assign({}, defaultOptions, params);

	return 'https://next-geebee.ft.com/image/v1/images/raw/' + encodeURIComponent(url) + '?' + _querystring2.default.stringify(options);
};