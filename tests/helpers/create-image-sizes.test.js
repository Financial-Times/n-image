import { expect } from 'chai';
import createImageSizes from '../../src/helpers/create-image-sizes';

describe('Create image sizes helper', () => {
	const colspan = {
		'default': 12,
		'M': 6,
		'L': 3
	};
	const position = {
		'default': 'left'
	};
	it('returns an object with sizes for each provided breakpoint', () => {
		const sizes = createImageSizes(colspan, position);
		expect(sizes.default).to.equal('calc(40vw - 16px)');
		expect(sizes.M).to.equal('134px');
		expect(sizes.L).to.equal('87px');
	});
});
