const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const sinon = require('sinon');

describe('lazy-load', () => {
  let dom;
  let lazyLoad;
  let MockIntersectionObserver;
  let MockIntersectionObserverConstructorSpy;
  let MockIntersectionObserverObserveSpy;
  
  beforeEach(() => {
    dom = new JSDOM(`
      <img id="image1" class="n-image--lazy-loading" />
      <img id="image2" class="n-image--lazy-loading" />
      <img id="image3" class="not-lazy-loading" />
    `);
    
    global.window = dom.window;
    global.document = dom.window.document;
  });
  
  describe('given window.IntersectionObserver is supported', () => {
    beforeEach(() => {
      MockIntersectionObserverConstructorSpy = sinon.spy();
      MockIntersectionObserverObserveSpy = sinon.spy();
      MockIntersectionObserver = class IntersectionObserver {
        constructor(callback, options) {
          MockIntersectionObserverConstructorSpy(callback, options);
        }

        observe(el) {
          MockIntersectionObserverObserveSpy(el);
        }
      };

      global.window.IntersectionObserver = MockIntersectionObserver;
      lazyLoad = require('../../src/lib/lazy-load');

      lazyLoad();
    });

    it('should construct an IntersectionObserver', () => {
      expect(MockIntersectionObserverConstructorSpy.callCount).to.equal(1);
      
      const constructorArgs = MockIntersectionObserverConstructorSpy.args[0];
      
      expect(typeof constructorArgs[0]).to.equal('function');
    });
    
    it('should observe each image with the lazy-loading class', () => {
      expect(MockIntersectionObserverObserveSpy.callCount).to.equal(2);
      expect(MockIntersectionObserverObserveSpy.args[0][0].id).to.equal('image1');
      expect(MockIntersectionObserverObserveSpy.args[1][0].id).to.equal('image2');
    });
  });
  
});
