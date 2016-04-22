import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import chai from 'chai';
chai.should();

import Image from '../../templates/image';

const renderComponent = component => {
	const shallowRenderer = ReactTestUtils.createRenderer();
	shallowRenderer.render(component);
	return shallowRenderer.getRenderOutput();
};

describe('Image', () => {

	it('should be able to create', () => {
		const image = <Image url="example/image.jpg" widths={[100]} />;
		ReactTestUtils.isElement(image).should.be.true;
	});

	it('should be able to set alt text', () => {
		const image = <Image url="example/image.jpg" widths={[100]} alt="Description of the image" />;
		renderComponent(image).props.alt.should.equal('Description of the image');
	});

	it('should be able to set classes', () => {
		const image = <Image url="example/image.jpg" widths={[100]} classes={['a-class', 'another-class']} />;
		renderComponent(image).props.className.should.equal('n-image a-class another-class');
	});

	it('should output correct srcset', () => {
		const image = <Image url="example/image.jpg" widths={[100]} />;
		renderComponent(image).props.srcSet.should.equal(
			'https://next-geebee.ft.com/image/v1/images/raw/example%2Fimage.jpg?source=next&fit=scale-down&compression=best&width=100 100w'
		);
	});

	it('should output correct multiple srcset', () => {
		const image = <Image url="example/image.jpg" widths={[100, 200]} />;
		renderComponent(image).props.srcSet.should.equal(
			'https://next-geebee.ft.com/image/v1/images/raw/example%2Fimage.jpg?source=next&fit=scale-down&compression=best&width=200 200w, ' +
			'https://next-geebee.ft.com/image/v1/images/raw/example%2Fimage.jpg?source=next&fit=scale-down&compression=best&width=100 100w'
		);
	});

	it('should output correct sizes', () => {
		const image = <Image url="example/image.jpg" widths={[100]} sizes={{ default: '100vw' }} />;
		renderComponent(image).props.sizes.should.equal('100vw');
	});

	it('should output correct multiple sizes', () => {
		const image = <Image url="example/image.jpg" widths={[100]} sizes={{ default: '100vw', XL: '100vw * 0.5' }} />;
		renderComponent(image).props.sizes.should.equal('(min-width: 1220px) 100vw * 0.5, 100vw');
	});

});
