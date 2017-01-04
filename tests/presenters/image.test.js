import { expect } from 'chai';
import ImagePresenter from '../../src/presenters/image';
import url from 'url';

describe('Image Presenter', () => {
	describe('Placeholders', () => {
		it('returns placeholder as a floating point number if it converts to one', () => {
			const inst = new ImagePresenter({
				placeholder: '1'
			});
			expect(inst.placeholder).to.equal(1);
		});

		it('returns unchanged placeholder if it cannot be a number', () => {
			const inst = new ImagePresenter({
				placeholder: 'landscape'
			});
			expect(inst.placeholder).to.equal('landscape');
		});
	});

	describe('Ratios', () => {
		it('returns ratio as square if placeholder value is 1', () => {
			const inst = new ImagePresenter({
				placeholder: '1'
			});
			expect(inst.ratio).to.equal('square');
		});

		it('returns ratio as landscape if placeholder value is 16 / 9', () => {
			const inst = new ImagePresenter({
				placeholder: 16 / 9
			});
			expect(inst.ratio).to.equal('landscape');
		});

		it('returns ratio as value of placeholder if it does not match anything specific', () => {
			const inst = new ImagePresenter({
				placeholder: 'foo'
			});
			expect(inst.ratio).to.equal('foo');
		});
	});

	describe('Wrapper attributes', () => {
		it('provides a default class', () => {
			const inst = new ImagePresenter({});
			expect(inst.wrapperAttrs.className).to.equal('n-image-wrapper');
		});
		it('adds a class for lazy loaded images', () => {
			const inst = new ImagePresenter({
				lazyLoad: true
			});
			expect(inst.wrapperAttrs.className).to.equal('n-image-wrapper n-image-wrapper--lazy-loading');
		});
		it('adds a class for images with placeholders', () => {
			const inst = new ImagePresenter({
				placeholder: 1.5
			});
			expect(inst.wrapperAttrs.className).to.equal('n-image-wrapper n-image-wrapper--placeholder');
		});
		it('adds a class for images with square placeholders', () => {
			const inst = new ImagePresenter({
				placeholder: 1
			});
			expect(inst.wrapperAttrs.className).to.equal('n-image-wrapper n-image-wrapper--placeholder n-image-wrapper--square-placeholder');
		});
		it('adds calculated padding in the style attribute for non-square numeric placeholders', () => {
			const inst = new ImagePresenter({
				placeholder: 2
			});
			expect(inst.wrapperAttrs.styleString).to.equal('padding-bottom:50%');
		});
	});

	describe('Image attributes', () => {
		it('provides a default class', () => {
			const inst = new ImagePresenter({});
			expect(inst.imgAttrs.className).to.equal('n-image ');
		});

		it('adds user-specified classes (array)', () => {
			const inst = new ImagePresenter({
				classes: ['foo', 'bar']
			});
			expect(inst.imgAttrs.className).to.equal('n-image foo bar');
		});

		it('adds user-specified classes (string)', () => {
			const inst = new ImagePresenter({
				classes: 'bash baz'
			});
			expect(inst.imgAttrs.className).to.equal('n-image bash baz');
		});

		it('sets alt to empty string if there is not one', () => {
			const inst = new ImagePresenter({});
			expect(inst.imgAttrs.alt).to.equal('');
		});

		it('sets role to presentation if there is no alt text', () => {
			const inst = new ImagePresenter({});
			expect(inst.imgAttrs.role).to.equal('presentation');
		});

		it('sets up the src with width and height, and no srcset', () => {
			const inst = new ImagePresenter({
				src: 'foo.jpg',
				width: '12',
				height: '12'
			});
			expect(inst.imgAttrs.src).to.equal('foo.jpg');
			expect(inst.imgAttrs.width).to.equal('12');
			expect(inst.imgAttrs.height).to.equal('12');
			expect(inst.imgAttrs.srcSet).to.not.be.defined;
		});

		it('if no src, sets up srcset', () => {
			const inst = new ImagePresenter({
				srcSet: 'foo.jpg',
				widths: '[100, 200]'
			});
			expect(inst.imgAttrs.src).to.not.be.defined;
			expect(inst.imgAttrs.srcSet).to.equal('https://www.ft.com/__origami/service/image/v2/images/raw/foo.jpg?source=next&fit=scale-down&compression=best&width=200 200w, https://www.ft.com/__origami/service/image/v2/images/raw/foo.jpg?source=next&fit=scale-down&compression=best&width=100 100w')
		});

		it('checks for url if no srcSet', () => {
			const inst = new ImagePresenter({
				url: 'foo.jpg',
				widths: '[100, 200]'
			});
			expect(inst.imgAttrs.src).to.not.be.defined;
			expect(inst.imgAttrs.srcSet).to.equal('https://www.ft.com/__origami/service/image/v2/images/raw/foo.jpg?source=next&fit=scale-down&compression=best&width=200 200w, https://www.ft.com/__origami/service/image/v2/images/raw/foo.jpg?source=next&fit=scale-down&compression=best&width=100 100w')
		});

		it('uses sizes attribute when given sizes in data', () => {
			const inst = new ImagePresenter({
				srcSet: 'foo.jpg',
				sizes: {
					'default': '50px',
					'M': '120px'
				}
			});
			expect(inst.imgAttrs.sizes).to.equal('(min-width: 740px) 120px, 50px');
		});

		it('calculates sizes attribute when there is no sizes attribute but there is a colspan and position', () => {
			const inst = new ImagePresenter({
				srcSet: 'foo.jpg',
				colspan: '{"default": 12, "M": 5}',
				position: '{"default": "left"}'
			});
			expect(inst.imgAttrs.sizes).to.equal('(min-width: 1220px) 190px, (min-width: 980px) 150px, (min-width: 740px) 110px, calc(40vw - 16px)');
		});

		it('switches src to datasrc for lazy loaded images', () => {
			const inst = new ImagePresenter({
				src: 'foo.jpg',
				lazyLoad: true
			});
			expect(inst.imgAttrs.src).to.not.be.defined;
			expect(inst.imgAttrs['data-src']).to.equal('foo.jpg');
		});

		it('switches srcSet to datasrcset for lazy loaded images', () => {
			const inst = new ImagePresenter({
				srcSet: 'foo.jpg',
				widths: '[100, 200]',
				lazyLoad: true
			});
			expect(inst.imgAttrs.srcSet).to.not.be.defined;
			expect(inst.imgAttrs['data-srcset']).to.equal('https://www.ft.com/__origami/service/image/v2/images/raw/foo.jpg?source=next&fit=scale-down&compression=best&width=200 200w, https://www.ft.com/__origami/service/image/v2/images/raw/foo.jpg?source=next&fit=scale-down&compression=best&width=100 100w');
		});

		it('allows a custom `source` parameter to be set for image service requests', () => {
			const inst = new ImagePresenter({
				srcSet: 'foo.jpg',
				widths: '[100]',
				lazyLoad: true,
				sourceParam: 'custom'
			});
			const imageUrl = url.parse(inst.imgAttrs['data-srcset'], true);
			expect(imageUrl.query.source).to.equal('custom');
		});
	});
});
