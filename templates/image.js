import React, { Component } from 'react';

import { breakpoints, buildImageServiceUrl } from '../helpers';

// append 'data-' to object's keys
const dataify = obj =>
	Object.keys(obj)
		.reduce((name, dataObj) =>
			Object.assign(dataObj, { [`data-${name}`]: obj[name] }), {}
		);

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
 */
export default class extends Component {
	render () {
		const image = this.props;
		const className = ['n-image']
			.concat(image.classes || [])
			.join(' ');
		const attrs = {
			alt: image.alt,
			className
		};
		if (image.src) {
			Object.assign(attrs, { src: image.src, width: image.width, height: image.height });
		} else {
			attrs.srcSet = image.widths
				.sort((widthOne, widthTwo) => widthTwo - widthOne)
				.map(width => `${buildImageServiceUrl(image.url, { width })} ${width}w`)
				.join(', ');
			const sizes = image.sizes || {};
			attrs.sizes = breakpoints
				.map(breakpoint => {
					const size = sizes[breakpoint.name];
					if (size) {
						return breakpoint.name === 'default' ? size : `(min-width: ${breakpoint.px}px) ${size}`;
					} else {
						return null;
					}
				})
				.filter(size => size)
				.join(', ');
		}
		const img = <img {...attrs} />;

		return image.lazyLoad ?
			<noscript className="n-image--lazy-loader" {...dataify(attrs)}>
				{img}
			</noscript> :
			img;
	}
};
