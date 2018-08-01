const {expect} = require('chai');
const {JSDOM} = require('jsdom');
const sinon = require('sinon');

describe('lazy-load', () => {
	let dom;
	let lazyLoad;
	let MockIntersectionObserver;
	let MockIntersectionObserverConstructorSpy;
	let MockIntersectionObserverObserveSpy;
	let mockFlags;

	beforeEach(() => {
		mockFlags = {};
		dom = new JSDOM(`
		<img id="image1" class="n-image--lazy-loading" />
		<img id="image2" class="n-image--lazy-loading" />
	`);

		global.window = dom.window;
		global.document = dom.window.document;

		global.window.FT = {
			flags: {
				get: flag => mockFlags[flag]
			}
		};
	});

	describe('construction', () => {
		describe('given window.IntersectionObserver is supported', () => {
			beforeEach(() => {
				MockIntersectionObserverConstructorSpy = sinon.spy();
				MockIntersectionObserverObserveSpy = sinon.spy();
				MockIntersectionObserver = class IntersectionObserver {
					constructor (callback, options) {
						MockIntersectionObserverConstructorSpy(callback, options);
					}

					observe (el) {
						MockIntersectionObserverObserveSpy(el);
					}
				};

				global.window.IntersectionObserver = MockIntersectionObserver;
				lazyLoad = require('../../src/lib/lazy-load');
			});

			describe('and no imgLazyLoadThreshold flag is set', () => {
				beforeEach(() => {
					lazyLoad();
				});

				it('should construct an IntersectionObserver with 0px rootMargin', () => {
					expect(MockIntersectionObserverConstructorSpy.callCount).to.equal(1);

					const constructorArgs = MockIntersectionObserverConstructorSpy.args[0];

					expect(typeof constructorArgs[0]).to.equal('function');
					expect(constructorArgs[1]).to.eql({
						rootMargin: '0px 0px 0px 0px'
					});
				});
			});

			describe('and a imgLazyLoadThreshold flag is set', () => {
				const THRESHOLD = '100px';
				beforeEach(() => {
					mockFlags['imgLazyLoadThreshold'] = THRESHOLD;
					lazyLoad();
				});

				it('should construct an IntersectionObserver with the rootMargin from the flag', () => {
					expect(MockIntersectionObserverConstructorSpy.callCount).to.equal(1);

					const constructorArgs = MockIntersectionObserverConstructorSpy.args[0];

					expect(typeof constructorArgs[0]).to.equal('function');
					expect(constructorArgs[1]).to.eql({
						rootMargin: `${THRESHOLD} 0px ${THRESHOLD} 0px`
					});
				});
			});
		});

		describe('observing images', () => {
			beforeEach(() => {
				lazyLoad();
			});

			it('should observe each image with the lazy-loading class', () => {
				expect(MockIntersectionObserverObserveSpy.callCount).to.equal(2);
				expect(MockIntersectionObserverObserveSpy.args[0][0].id).to.equal('image1');
				expect(MockIntersectionObserverObserveSpy.args[1][0].id).to.equal('image2');
			});
		});
	});

});
