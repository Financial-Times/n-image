import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import chai from 'chai';
chai.should();

import Picture from '../../components/picture';

const renderComponent = element => {
	const shallowRenderer = ReactTestUtils.createRenderer();
	shallowRenderer.render(element);
	return shallowRenderer.getRenderOutput();
};

const getInnerHTML = element => element.props.dangerouslySetInnerHTML.__html;

describe('Image', () => {

	it('should be able to create', () => {
		const picture = <Picture urls={{ default: 'an/image.jpg' }} />;
		ReactTestUtils.isElement(picture).should.be.true;
	});

	it('should be able to set default image', () => {
		const picture = <Picture urls={{ default: 'an/image.jpg' }} />;
		getInnerHTML(renderComponent(picture)).should.equal('<img class="n-image__img" alt="" srcset="an/image.jpg" />');
	});

	it('should be able to not supply default image', () => {
		const picture = <Picture urls={{ M: 'another/image.jpg' }} />;
		getInnerHTML(renderComponent(picture)).should.equal(
			'<!--[if IE 9]><video style="display: none;"><![endif]-->' +
			'<source srcset="another/image.jpg" media="(min-width: 740px)" />' +
			'<!--[if IE 9]></video><![endif]-->' +
			'<img class="n-image__img" alt="" />'
		);
	});

	it('should be able to set sources', () => {
		const picture = <Picture urls={{ default: 'an/image.jpg', M: 'another/image.jpg', XL: 'yet-another/image.jpg' }} />;
		getInnerHTML(renderComponent(picture)).should.have.string(
			'<source srcset="yet-another/image.jpg" media="(min-width: 1220px)" />' +
			'<source srcset="another/image.jpg" media="(min-width: 740px)" />'
		);
	});

	it('should be able to set fallback image', () => {
		const picture = <Picture urls={{ default: 'an/image.jpg' }} withFallback={true} />;
		getInnerHTML(renderComponent(picture)).should.equal('<img class="n-image__img" alt="" src="an/image.jpg" />');
	});

	it('should be able to set classes', () => {
		const picture = <Picture urls={{ default: 'an/image.jpg' }} classes={['a-class', 'another-class']} />;
		renderComponent(picture).props.className.should.equal('n-image a-class another-class');
	});

	it('should be able to set alt', () => {
		const picture = <Picture urls={{ default: 'an/image.jpg' }} alt="A useful description" />;
		getInnerHTML(renderComponent(picture)).should.equal('<img class="n-image__img" alt="A useful description" srcset="an/image.jpg" />');
	});

	it('should be able to set img classes', () => {
		const picture = <Picture urls={{ default: 'an/image.jpg' }} imgClasses={['a-class', 'another-class']} />;
		getInnerHTML(renderComponent(picture)).should.equal('<img class="n-image__img a-class another-class" alt="" srcset="an/image.jpg" />');
	});

});
