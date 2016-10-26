const React = require('react');
const ImagePresenter = require('../presenters/image');

const Component = React.Component;

class Image extends Component {
	render () {
		const imageData = new ImagePresenter(this.props);
		return (
			<div {...imageData.wrapperAttrs}>
				<img {...imageData.imgAttrs} />
			</div>
		);
	}
}

module.exports = Image;
