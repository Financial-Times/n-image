import React, { Component } from 'react';

import { breakpoints, buildImageServiceUrl } from '../helpers';

/**
 * @param {string} url - URL of the image
 * @param {number[]} widths - Widths of the image, in pixels
 * @param {Object} [sizes = {}] - Keys are breakpoints, values the length. e.g.
 * { default: '33.3vw', L: 'calc(.333 * (100vw - 12em)'}
 * @param {string} [urlTemplate] - If supplied, use to construct the image url but replacing instances of `{width}` and
 * `{url}` with the values in the srcset
 * @param {string[]|string} [classes = []] - Additional classes to add to the element
 * @param {string} [alt = ''] - Alt text for the image
 */
export default class extends Component {
	render () {
		const sizes = this.props.sizes || {};
		const className = ['n-image']
			.concat(this.props.classes || [])
			.join(' ');
		const srcset = this.props.widths
			.map(width => `${buildImageServiceUrl(this.props.url, { width })} ${width}w`)
			.join(', ');
		const imgSizes = breakpoints
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

		return <img className={className} srcSet={srcset} sizes={imgSizes} alt={this.props.alt || ''}/>;
	}
};
