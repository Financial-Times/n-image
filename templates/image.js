import React, { Component } from 'react';
import { buildUrl, addWidth } from '../helpers/';

export default class Image extends Component {
	render () {
		const createMarkup = (url, srcset, { alt = '', isImgServiceUrl = false, imgClasses = [], imageServiceParams = {} }) => {
			const imageServiceUrl = buildUrl(url, imageServiceParams, { isImgServiceUrl });
			const imgClass = imgClasses.join(' ');

			return 	{__html:
				`<!--[if IE 9]><video style="display: none;"><![endif]-->
				${srcset.xl ? `<source srcSet="${addWidth(imageServiceUrl, srcset.xl)}" media="(min-width: 1220px)"/>` : ''}
				${srcset.l ? `<source srcSet="${addWidth(imageServiceUrl, srcset.l)}" media="(min-width: 980px)"/>` : ''}
				${srcset.m ? `<source srcSet="${addWidth(imageServiceUrl, srcset.m)}" media="(min-width: 740px)"/>` : ''}
				${srcset.s ? `<source srcSet="${addWidth(imageServiceUrl, srcset.s)}" media="(min-width: 490px)"/>` : ''}
				<!--[if IE 9]></video><![endif]-->
				${srcset.fallback
					? `<img class="${imgClass}" src="${addWidth(imageServiceUrl, srcset.fallback)}" alt="${alt}"/>`
					: srcset.default
						? `<img class="${imgClass}" srcSet="${addWidth(imageServiceUrl, srcset.default)}" alt="${alt}"/>`
						: `<img class="${imgClass}" alt="${alt}"/>`
				}`
			};
		};

		const picClasses = ['n-image'];
		if (this.props.picClass) picClasses.push(this.props.picClass);

		const imgClasses = ['n-image__img'];
		if (this.props.imgClass) imgClasses.push(this.props.imgClass);

		const opts = {
			alt: this.props.alt,
			isImgServiceUrl: this.props.isImgServiceUrl,
			imageServiceParams: this.props.imageServiceParams,
			imgClasses
		};

		// dangerouslySetInnerHTML is used to render the conditional IE9 comments
		// Will throw an error if such comments are returned directly
		return (
			<picture
				className={picClasses.join(' ')}
				dangerouslySetInnerHTML={createMarkup(this.props.url, this.props.srcset, opts)}>
			</picture>
		);
	}
}
