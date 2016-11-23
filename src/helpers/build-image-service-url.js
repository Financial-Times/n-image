const qs = require('querystring');

const capiRX = /^http:\/\/com\.ft\.imagepublish\.prod\.s3\.amazonaws\.com\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/

module.exports = (url, params = {}, { host = 'https://www.ft.com/__origami/service/image/v2/images/raw/' } = { }) => {
	const defaultOptions = {
		source: 'next',
		fit: 'scale-down',
		compression: 'best'
	};
	const options = Object.assign({}, defaultOptions, params);
	const capiUUID = (capiRX.exec(url) || [])[1];

	return `${host + (capiUUID ? 'ftcms:'+capiUUID : encodeURIComponent(url))}?${qs.stringify(options)}`;
};
