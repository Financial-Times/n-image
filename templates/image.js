import React, {Component} from 'react';
import buildUrl from '../helpers/build-url';

export default class Image extends Component {
	render () {
		const createMarkup = (imgClasses, alt, srcset, url) => {
			const imgClass = imgClasses.join(' ');
			return 	{__html:
				`<!--[if IE 9]><video style="display: none;"><![endif]-->
				${srcset.xl ? `<source srcSet="${url + srcset.xl}" media="(min-width: 1220px)"/>` : null}
				${srcset.l ? `<source srcSet="${url + srcset.l}" media="(min-width: 980px)"/>` : null}
				${srcset.m ? `<source srcSet="${url + srcset.m}" media="(min-width: 740px)"/>` : null}
				${srcset.s ? `<source srcSet="${url + srcset.s}" media="(min-width: 490px)"/>` : null}
				<!--[if IE 9]></video><![endif]-->
				${srcset.fallback
					? `<img class="${imgClass}" src="${url + srcset.fallback}" alt="${alt}"/>`
					: srcset.default
						? `<img class="${imgClass}" srcSet="${url + srcset.default}" alt="${alt}"/>`
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
		const url = buildUrl(this.props.url, this.props.imgServiceReqd);

		// dangerouslySetInnerHTML is used to render the conditional IE9 comments
		// Will throw an error if such comments are returned directly
		return (
			<picture className={picClasses.join(' ')} dangerouslySetInnerHTML={createMarkup(imgClasses, alt, srcset, url)}>
			</picture>
		);
	}
}
