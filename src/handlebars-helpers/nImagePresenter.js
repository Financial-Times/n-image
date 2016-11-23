const ImagePresenter = require('../presenters/image');

module.exports = (options) => {
	if (options.data) {
		const image = new ImagePresenter(options.hash);
		return options.fn({ image });
	}
};
