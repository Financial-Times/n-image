import { expect } from 'chai';
import buildImageServiceUrl from '../../src/helpers/build-image-service-url';

describe('Build image service url helper', () => {
	it('converts capi eu images to ftcms scheme', () => {
		const imageUrl = buildImageServiceUrl('http://com.ft.imagepublish.prod.s3.amazonaws.com/6aab7b1a-a7a1-11e6-8b69-02899e8bd9d1');
		expect(imageUrl).to.equal('https://www.ft.com/__origami/service/image/v2/images/raw/ftcms:6aab7b1a-a7a1-11e6-8b69-02899e8bd9d1?source=next&fit=scale-down&compression=best');
	});

	it('converts capi us images to ftcms scheme', () => {
		const imageUrl = buildImageServiceUrl('http://com.ft.imagepublish.prod-us.s3.amazonaws.com/6aab7b1a-a7a1-11e6-8b69-02899e8bd9d1');
		expect(imageUrl).to.equal('https://www.ft.com/__origami/service/image/v2/images/raw/ftcms:6aab7b1a-a7a1-11e6-8b69-02899e8bd9d1?source=next&fit=scale-down&compression=best');
	});

	it('has a default host of the origami image service v2', () => {
		const imageUrl = buildImageServiceUrl('https://www.example.com/image.png');
		expect(imageUrl).to.equal('https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fwww.example.com%2Fimage.png?source=next&fit=scale-down&compression=best');
	});

	it('does not send image service urls to the image service again', () => {
		const imageUrl = buildImageServiceUrl('https://www.ft.com/__origami/service/image/v2/images/raw/fthead-v1:tim-harford?source=next&fit=scale-down&compression=best&tint=054593,d6d5d3');
		expect(imageUrl).to.equal('https://www.ft.com/__origami/service/image/v2/images/raw/fthead-v1:tim-harford?source=next&fit=scale-down&compression=best&tint=054593,d6d5d3');
	});

});
