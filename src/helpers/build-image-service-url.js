const qs = require('querystring');

module.exports = (url, params = {}, { host = 'https://next-geebee.ft.com/image/v1/images/raw/' } = { }) => {
	const defaultOptions = {
		source: 'next',
		fit: 'scale-down',
		compression: 'best'
	};
	const options = Object.assign({}, defaultOptions, params);
	return `${host + encodeURIComponent(url)}?${qs.stringify(options)}`;
};
