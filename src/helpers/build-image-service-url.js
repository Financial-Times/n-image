import qs from 'querystring';

const capiRX = /^http:\/\/com\.ft\.imagepublish\.prod\.s3\.amazonaws\.com\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/

export default (url, params = {}) => {
	const defaultOptions = {
		source: 'next',
		fit: 'scale-down',
		compression: 'best'
	};
	const options = Object.assign({}, defaultOptions, params);
	const capiUUID = (capiRX.exec(url) || [])[1];

	return `https://next-geebee.ft.com/image/v1/images/raw/${capiUUID ? `ftcms:${capiUUID}` : encodeURIComponent(url)}?${qs.stringify(options)}`;
};
