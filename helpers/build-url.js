import qs from 'querystring';

export default (url, imgServiceReqd) => {
	const imageOptions = {
		source: 'next',
		fit: 'scale-down',
		compression: 'best'
	};

	if (imgServiceReqd) url = `https:\/\/next-geebee.ft.com/image/v1/images/raw/${encodeURIComponent(url)}`;
	return url += `?${qs.stringify(imageOptions)}&width=`;
}
