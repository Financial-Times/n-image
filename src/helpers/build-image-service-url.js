import qs from 'querystring';

export default (url, params = {}) => {
	const defaultOptions = {
		source: 'next',
		fit: 'scale-down',
		compression: 'best'
	};
	const options = Object.assign({}, defaultOptions, params);

	return `https://next-geebee.ft.com/image/v1/images/raw/${encodeURIComponent(url)}?${qs.stringify(options)}`;
};
