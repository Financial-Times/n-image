import React, { Component } from 'react';
import { buildUrl, addWidth } from '../helpers/';

export default class Image extends Component {
	render () {
		const createMarkup = (imgClasses, alt, srcset, rawUrl) => {
			const url = buildUrl(rawUrl, {}, { isImgServiceUrl });
			const imgClass = imgClasses.join(' ');

			return 	{__html:
				`<!--[if IE 9]><video style="display: none;"><![endif]-->
				${srcset.xl ? `<source srcSet=${addWidth(url, srcset.xl)} media="(min-width: 1220px)"/>` : null}
				${srcset.l ? `<source srcSet=${addWidth(url, srcset.l)} media="(min-width: 980px)"/>` : null}
				${srcset.m ? `<source srcSet=${addWidth(url, srcset.m)} media="(min-width: 740px)"/>` : null}
				${srcset.s ? `<source srcSet=${addWidth(url, srcset.s)} media="(min-width: 490px)"/>` : null}
				<!--[if IE 9]></video><![endif]-->
				${srcset.fallback
					? `<img class="${imgClass}" src=${addWidth(url, srcset.fallback)} alt="${alt}"/>`
					: srcset.default
						? `<img class="${imgClass}" srcSet=${addWidth(url, srcset.default)} alt="${alt}"/>`
						: `<img class="${imgClass}" alt="${alt}"/>`
				}`
			};
		};

		const picClasses = ['n-image'];
		if (this.props.picClass) picClasses.push(this.props.picClass);

		const imgClasses = ['n-image__img'];
		if (this.props.imgClass) imgClasses.push(this.props.imgClass);

		const alt = this.props.alt ? this.props.alt : '';
		const srcset = this.props.srcset;
		const rawUrl = this.props.url;
		const isImgServiceUrl = this.props.isImgServiceUrl;

		// dangerouslySetInnerHTML is used to render the conditional IE9 comments
		// Will throw an error if such comments are returned directly
		return (
			<picture
				className={picClasses.join(' ')}
				dangerouslySetInnerHTML={createMarkup(imgClasses, alt, srcset, rawUrl, isImgServiceUrl)}>
			</picture>
		);
	}
}
