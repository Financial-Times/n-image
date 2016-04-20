import qs from 'querystring';

export default (url, params = {}, { isImgServiceUrl = false } = {}) => {
	const defaultOptions = {
		source: 'next',
		fit: 'scale-down',
		compression: 'best'
	};
	const options = Object.assign({}, defaultOptions, params);
	if (!isImgServiceUrl) {
		url = `https:\/\/next-geebee.ft.com/image/v1/images/raw/${encodeURIComponent(url)}`;
	}

	return url += `?${qs.stringify(options)}`;
};
