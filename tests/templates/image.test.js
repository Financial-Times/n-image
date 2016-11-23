import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import chai from 'chai';
chai.should();
const expect = chai.expect;

import Image from '../../src/components/image';

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

	it('should create a wrapper around the image', () => {
		const image = <Image url="example/image.jpg" widths={[100]} />;
		const wrapper = renderComponent(image);
		wrapper.props.className.should.equal('n-image-wrapper');
	});

	it('should be able to set alt text', () => {
		const image = <Image url="example/image.jpg" widths={[100]} alt="Description of the image" />;
		renderComponent(image).props.children.props.alt.should.equal('Description of the image');
	});

	it('should have an empty alt attribute if no alt text set', () => {
		const image = <Image url="example/image.jpg" widths={[100]} alt="" />;
		renderComponent(image).props.children.props.alt.should.equal('');
	});

	it('should have an empty alt attribute if no alt attr is set', () => {
		const image = <Image url="example/image.jpg" widths={[100]} />;
		renderComponent(image).props.children.props.alt.should.equal('');
	});

	it('should set role to presentation when there is no alt text', () => {
		const image = <Image url="example/image.jpg" widths={[100]} alt="" />;
		renderComponent(image).props.children.props.role.should.equal('presentation');
	});

	it('should set role to presentation when there is no alt attr', () => {
		const image = <Image url="example/image.jpg" widths={[100]} />;
		renderComponent(image).props.children.props.role.should.equal('presentation');
	});

	it('should NOT set role to presentation when there is alt text', () => {
		const image = <Image url="example/image.jpg" widths={[100]} alt="Description of the image" />;
		expect(renderComponent(image).props.children.props.role).to.not.exist;
	});

	it('should be able to set classes', () => {
		const image = <Image url="example/image.jpg" widths={[100]} classes={['a-class', 'another-class']} />;
		renderComponent(image).props.children.props.className.should.equal('n-image a-class another-class');
	});

	it('should output correct srcset', () => {
		const image = <Image url="example/image.jpg" widths={[100]} />;
		renderComponent(image).props.children.props.srcSet.should.equal(
			'https://www.ft.com/__origami/service/image/v2/images/raw/example%2Fimage.jpg?source=next&fit=scale-down&compression=best&width=100 100w'
		);
	});

	it('should output correct multiple srcset', () => {
		const image = <Image url="example/image.jpg" widths={[100, 200]} />;
		renderComponent(image).props.children.props.srcSet.should.equal(
			'https://www.ft.com/__origami/service/image/v2/images/raw/example%2Fimage.jpg?source=next&fit=scale-down&compression=best&width=200 200w, ' +
			'https://www.ft.com/__origami/service/image/v2/images/raw/example%2Fimage.jpg?source=next&fit=scale-down&compression=best&width=100 100w'
		);
	});

	it('should output correct sizes', () => {
		const image = <Image url="example/image.jpg" widths={[100]} sizes={{ default: '100vw' }} />;
		renderComponent(image).props.children.props.sizes.should.equal('100vw');
	});

	it('should output correct multiple sizes', () => {
		const image = <Image url="example/image.jpg" widths={[100]} sizes={{ default: '100vw', XL: '100vw * 0.5' }} />;
		renderComponent(image).props.children.props.sizes.should.equal('(min-width: 1220px) 100vw * 0.5, 100vw');
	});

});
