import React, {Component} from 'react';

export default class Image extends Component {
	render () {

		const createMarkup = () => {
			return 	{__html: 	`<!--[if IE 9]><video style="display: none;"><![endif]-->
								${srcset.xl ? '<source srcSet=' + url + srcset.xl + ' media="(min-width: 1220px)"/>' : null}
								${srcset.l ? '<source srcSet=' + url + srcset.l + ' media="(min-width: 980px)"/>' : null}
								${srcset.m ? '<source srcSet=' + url + srcset.m + ' media="(min-width: 740px)"/>' : null}
								${srcset.s ? '<source srcSet=' + url + srcset.s + ' media="(min-width: 490px)"/>' : null}
								<!--[if IE 9]></video><![endif]-->
								${srcset.fallback
									? '<img class="' + imgClass + 'n-image__img" src=' + url + srcset.fallback + ' alt="' + alt + '"/>'
									: srcset.default
										? '<img class="' + imgClass + 'n-image__img" srcSet=' + url + srcset.default + ' alt="' + alt + '"/>'
										: '<img class="' + imgClass + 'n-image__img" alt="' + alt + '"/>'
								}`
					};
		};

		const picClass = this.props.picClass ? `${this.props.picClass} ` : "";
		const imgClass = this.props.imgClass ? `${this.props.imgClass} ` : "";
		const alt = this.props.alt ? this.props.alt : "";
		const srcset = this.props.srcset;
		const url = this.props.url;

		return (
			<picture className={picClass + "n-image"} dangerouslySetInnerHTML={createMarkup()}>
			</picture>
		);
	}
}
