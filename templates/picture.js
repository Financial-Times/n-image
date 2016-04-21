import React, { Component } from 'react';

import { breakpoints } from '../helpers/';

const createImg = attrs => {
	const attrsStringified = Object.keys(attrs)
		.map(attrName => `${attrName}="${attrs[attrName]}"`)
		.join(' ');
	return `<img ${attrsStringified} />`
};

const createSources = (urls, { alt = '', classes = [], withFallback = false }) => {
	const className = classes.join(' ');
	let sources = breakpoints
		.filter(breakpoint => breakpoint.name !== 'default')
		.map(breakpoint => {
			const url = urls[breakpoint.name];
			return url ? `<source srcset="${url}" media="(min-width: ${breakpoint.px}px)" />` : null
		})
		.filter(source => source);
	if (sources.length) {
		sources = ['<!--[if IE 9]><video style="display: none;"><![endif]-->']
			.concat(sources, '<!--[if IE 9]></video><![endif]-->');
	}

	const imgAttrs = {
		'class': className,
		alt
	};

	if (urls.default) {
		const defaultSrc = urls.default;
		if (withFallback) {
			imgAttrs.src = defaultSrc;
		} else {
			imgAttrs.srcset = defaultSrc;
		}
	}

	return sources
		.concat(createImg(imgAttrs))
		.join('');
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
export default class extends Component {
	render () {
		const classes = ['n-image'].concat(this.props.classes || []).join(' ');
		const imgClasses = ['n-image__img'].concat(this.props.imgClasses || []);
		const opts = {
			alt: this.props.alt,
			classes: imgClasses,
			withFallback: this.props.withFallback
		};


		// dangerouslySetInnerHTML is used to render the conditional IE9 comments
		// Will throw an error if such comments are returned directly
		return (
			<picture
				className={classes}
				dangerouslySetInnerHTML={{__html: createSources(this.props.urls, opts)}}>
			</picture>
		);
	}
}
