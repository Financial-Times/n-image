import React, { Component } from 'react';

export default class extends Component {
	render () {
		return (
			<picture
				className={picClasses.join(' ')}
				dangerouslySetInnerHTML={createMarkup(this.props.url, this.props.srcset, opts)}>
			</picture>
		);
	}
}
