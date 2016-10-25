import React, { Component } from 'react';
import ImagePresenter from '../presenters/image';

export default class extends Component {
	render () {
		const imageData = new ImagePresenter(this.props);
		return (
			<div {...imageData.wrapperAttrs}>
				<img {...imageData.imgAttrs} />
			</div>
		);
	}
}
