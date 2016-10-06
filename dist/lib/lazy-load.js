'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var lazyLoadingModifier = 'lazy-loading';
var lazyLoadingImageClass = 'n-image--' + lazyLoadingModifier;
var lazyLoadingWrapperClass = 'n-image-wrapper--' + lazyLoadingModifier;

var imageHasLoaded = function imageHasLoaded(img) {
	img.classList.remove(lazyLoadingImageClass);
	img.parentNode.classList.remove(lazyLoadingWrapperClass);
	img.removeEventListener('load', imageHasLoaded);
};

var loadImage = function loadImage(img) {
	img.addEventListener('load', function () {
		// NOTE: rather arbitrary, needed to get the fading to always work (possibly classes being removed to quickly)
		setTimeout(imageHasLoaded.bind(null, img), 13);
	});
	// add the src/srcset attribtues back in
	[].concat(_toConsumableArray(img.attributes)).forEach(function (attr) {
		if (/^data-src(set)?$/.test(attr.name)) {
			img.setAttribute(attr.name.replace('data-', ''), attr.value);
			img.removeAttribute(attr.name);
		}
	});
};

var intersectionCallback = function intersectionCallback(observer, changes) {
	changes.forEach(function (change) {
		var observedImg = change.target;
		loadImage(observedImg);
		observer.unobserve(observedImg);
	});
};

var observeIntersection = function observeIntersection(_ref, img) {
	var observer = _ref.observer;

	if (observer) {
		observer.observe(img);
	} else {
		loadImage(img);
	}
	img.setAttribute('data-n-image-lazy-load-js', '');
};

/**
 * @param {Object} [opts = {}]
 * @param {Element} [opts.root = document] - Where in the DOM to search for images
 */

exports.default = function () {
	var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var _ref2$root = _ref2.root;
	var root = _ref2$root === undefined ? document : _ref2$root;

	var observer = window.IntersectionObserver ? new IntersectionObserver(function (changes) {
		intersectionCallback(this, changes);
	}) : null;
	[].concat(_toConsumableArray(root.querySelectorAll('.' + lazyLoadingImageClass))).filter(function (img) {
		return !img.hasAttribute('data-n-image-lazy-load-js');
	}).forEach(observeIntersection.bind(null, { observer: observer }));
};