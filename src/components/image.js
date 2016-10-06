import React, { Component } from 'react';

import { breakpoints, buildImageServiceUrl } from '../helpers';

// convert the `src` or `srcset` attribtues to a data attribute
const hideImage = obj =>
	Object.keys(obj)
		.reduce((dataObj, name) => {
			if (name === 'src' || name === 'srcSet') {
				dataObj[`data-${name.toLowerCase()}`] = obj[name];
			} else {
				dataObj[name] = obj[name];
			}
			return dataObj;
		}, {});

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
export default class extends Component {
	render () {
		const image = this.props;
		const className = ['n-image']
			.concat(image.classes || [])
			.join(' ');
		const attrs = {
			alt: image.alt || '',
			className
		};
		const wrapperClassNames = ['n-image-wrapper'];

		if (image.placeholder) {
			wrapperClassNames.push('n-image-wrapper--placeholder');
		}
		let ratio = image.placeholder;
		if (typeof ratio === 'number') {
			if (ratio === 1) {
				ratio = 'square';
			} else if (ratio === 16 / 9) {
				ratio = 'landscape'
			}
		}
		if (['square'].indexOf(ratio) > -1) {
			wrapperClassNames.push(`n-image-wrapper--${ratio}-placeholder`);
		}
		if (image.lazyLoad) {
			wrapperClassNames.push('n-image-wrapper--lazy-loading');
		}
		const wrapperAttrs = {
			className: wrapperClassNames.join(' ')
		};
		if (typeof ratio === 'number') {
			wrapperAttrs.style = { 'padding-bottom': `${100 * (1 / ratio)}%` };
		}
		if (!attrs.alt) {
			attrs.role = 'presentation';
		}
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
					return size ?
						breakpoint.name === 'default' ? size : `(min-width: ${breakpoint.px}px) ${size}` :
						null;
				})
				.filter(size => size)
				.join(', ');
		}
		const lazyLoadedAttrs = hideImage(attrs);
		lazyLoadedAttrs.className += ' n-image--lazy-loading';

		return (
			<div {...wrapperAttrs}>
				{ image.lazyLoad ? <img {...lazyLoadedAttrs} /> : <img {...attrs} /> }
			</div>
		);
	}
};
