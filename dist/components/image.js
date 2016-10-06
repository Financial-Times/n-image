'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// convert the `src` or `srcset` attribtues to a data attribute
var hideImage = function hideImage(obj) {
	return Object.keys(obj).reduce(function (dataObj, name) {
		if (name === 'src' || name === 'srcSet') {
			dataObj['data-' + name.toLowerCase()] = obj[name];
		} else {
			dataObj[name] = obj[name];
		}
		return dataObj;
	}, {});
};

/**
 * @param {string} src - Actual src to use. If set, assume it's non-responsive, i.e. ignore url, widths, sizes
 * @param {string} url - URL of the image
 * @param {number[]} widths - Widths of the image, in pixels
 * @param {Object} [sizes = {}] - Keys are breakpoints, values the length. e.g.
 * { default: '33.3vw', L: 'calc(.333 * (100vw - 12em)'}
 * @param {string[]|string} [classes = []] - Additional classes to add to the element
 * @param {string} [width] - Width of the image
 * @param {string} [height] - Height of the image
 * @param {string} [alt = ''] - Alt text for the image
 * @param {boolean} [lazyLoad = false] - Lazy load the image
 * @param {string|number} [placeholder] - Set to add a placeholder. Value should be the ratio of the image as a number
 * (width divided by height, e.g.`16/9`), or string (`square` or `landscape`)
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
			var image = this.props;
			var className = ['n-image'].concat(image.classes || []).join(' ');
			var attrs = {
				alt: image.alt || '',
				className: className
			};
			var wrapperClassNames = ['n-image-wrapper'];

			if (image.placeholder) {
				wrapperClassNames.push('n-image-wrapper--placeholder');
			}
			var ratio = image.placeholder;
			if (typeof ratio === 'number') {
				if (ratio === 1) {
					ratio = 'square';
				} else if (ratio === 16 / 9) {
					ratio = 'landscape';
				}
			}
			if (['square'].indexOf(ratio) > -1) {
				wrapperClassNames.push('n-image-wrapper--' + ratio + '-placeholder');
			}
			if (image.lazyLoad) {
				wrapperClassNames.push('n-image-wrapper--lazy-loading');
			}
			var wrapperAttrs = {
				className: wrapperClassNames.join(' ')
			};
			if (typeof ratio === 'number') {
				wrapperAttrs.style = { 'padding-bottom': 100 * (1 / ratio) + '%' };
			}
			if (!attrs.alt) {
				attrs.role = 'presentation';
			}
			if (image.src) {
				Object.assign(attrs, { src: image.src, width: image.width, height: image.height });
			} else {
				(function () {
					attrs.srcSet = image.widths.sort(function (widthOne, widthTwo) {
						return widthTwo - widthOne;
					}).map(function (width) {
						return (0, _helpers.buildImageServiceUrl)(image.url, { width: width }) + ' ' + width + 'w';
					}).join(', ');
					var sizes = image.sizes || {};
					attrs.sizes = _helpers.breakpoints.map(function (breakpoint) {
						var size = sizes[breakpoint.name];
						return size ? breakpoint.name === 'default' ? size : '(min-width: ' + breakpoint.px + 'px) ' + size : null;
					}).filter(function (size) {
						return size;
					}).join(', ');
				})();
			}
			var lazyLoadedAttrs = hideImage(attrs);
			lazyLoadedAttrs.className += ' n-image--lazy-loading';

			return _react2.default.createElement(
				'div',
				wrapperAttrs,
				image.lazyLoad ? _react2.default.createElement('img', lazyLoadedAttrs) : _react2.default.createElement('img', attrs)
			);
		}
	}]);

	return _class;
}(_react.Component);

exports.default = _class;
;