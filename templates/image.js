import React, { Component } from 'react';

import { breakpoints, buildUrl } from '../helpers';

const createUrl = (template, params = {}) =>
	Object.keys(params)
		.reduce((url, param) => url.replace(new RegExp(`{${param}}`, 'g'), params[param]), template);

/**
 * @param {string} url - URL of the image
 * @param {number[]} widths - Widths of the image, in pixels
 * @param {Object} sizes - Keys are breakpoints, values the length. e.g.
 * { default: '33.3vw', L: 'calc(.333 * (100vw - 12em)'}
 * @param {string} [urlTemplate] - If supplied, use to construct the image url but replacing instances of `{width}` and
 * `{url}` with the values in the srcset
 */
export default class extends Component {
	render () {
		const url = this.props.url;

		const srcset = this.props.widths
			.map(width => `${buildUrl(url, { width })} ${width}w`)
			.join(', ');
		const sizes = breakpoints
			.reverse()
			.map(breakpoint => {
				const size = this.props.sizes[breakpoint.name];
				if (size) {
					return breakpoint.name === 'default' ? size : `(min-width: ${breakpoint.px}px) ${size}`;
				} else {
					return null;
				}
			})
			.filter(size => size)
			.join(', ');

		return <img className="n-image__img" srcSet={srcset} sizes={sizes} />;
	}
};
