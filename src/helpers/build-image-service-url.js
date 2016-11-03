const qs = require('querystring');

module.exports = (url, params = {}, { host = 'https://www.ft.com/__origami/service/image/v2/images/raw/' } = { }) => {
	const defaultOptions = {
		source: 'next',
		fit: 'scale-down',
		compression: 'best'
	};
	const options = Object.assign({}, defaultOptions, params);
	return `${host + encodeURIComponent(url)}?${qs.stringify(options)}`;
};
