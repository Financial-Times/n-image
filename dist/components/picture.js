'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpers = require('../helpers/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createImg = function createImg(attrs) {
	var attrsStringified = Object.keys(attrs).map(function (attrName) {
		return attrName + '="' + attrs[attrName] + '"';
	}).join(' ');
	return '<img ' + attrsStringified + ' />';
};

var createSources = function createSources(urls, _ref) {
	var _ref$alt = _ref.alt;
	var alt = _ref$alt === undefined ? '' : _ref$alt;
	var _ref$classes = _ref.classes;
	var classes = _ref$classes === undefined ? [] : _ref$classes;
	var _ref$withFallback = _ref.withFallback;
	var withFallback = _ref$withFallback === undefined ? false : _ref$withFallback;

	var className = classes.join(' ');
	var sources = _helpers.breakpoints.filter(function (breakpoint) {
		return breakpoint.name !== 'default';
	}).map(function (breakpoint) {
		var url = urls[breakpoint.name];
		return url ? '<source srcset="' + url + '" media="(min-width: ' + breakpoint.px + 'px)" />' : null;
	}).filter(function (source) {
		return source;
	});
	if (sources.length) {
		sources = ['<!--[if IE 9]><video style="display: none;"><![endif]-->'].concat(sources, '<!--[if IE 9]></video><![endif]-->');
	}

	var imgAttrs = {
		'class': className,
		alt: alt
	};

	if (!alt) {
		imgAttrs.role = 'presentation';
	}

	if (urls.default) {
		var defaultSrc = urls.default;
		if (withFallback) {
			imgAttrs.src = defaultSrc;
		} else {
			imgAttrs.srcset = defaultSrc;
		}
	}

	return sources.concat(createImg(imgAttrs)).join('');
};

/**
 * @param {Object} urls - URLs of the image to use at different breakpoints. Key is the breakpoint, value the URL,
 * e.g. { default: 'some/image.jpg', L: 'another/image.jpg' }
 * @param {boolean} [withFallback = false] - Render a 'fallback' image, in the `default` size i.e. for browsers that
 * don't support the picture element
 * @param {string[]|string} [classes = []] - Additional classes to add to the `picture` element
 * @param {string[]|string} [imgClasses = []] - Additional classes to add to the `img` element
 * @param {string} [alt = ''] - Alt text for the image
 */

var _class = function (_Component) {
	_inherits(_class, _Component);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'render',
		value: function render() {
			var classes = ['n-image'].concat(this.props.classes || []).join(' ');
			var imgClasses = ['n-image__img'].concat(this.props.imgClasses || []);
			var opts = {
				alt: this.props.alt,
				classes: imgClasses,
				withFallback: this.props.withFallback
			};

			// dangerouslySetInnerHTML is used to render the conditional IE9 comments
			// Will throw an error if such comments are returned directly
			return _react2.default.createElement('picture', {
				className: classes,
				dangerouslySetInnerHTML: { __html: createSources(this.props.urls, opts) } });
		}
	}]);

	return _class;
}(_react.Component);

exports.default = _class;