const lazyLoadingModifier = 'lazy-loading';
const lazyLoadingImageClass = `n-image--${lazyLoadingModifier}`;
const lazyLoadingWrapperClass = `n-image-wrapper--${lazyLoadingModifier}`;

const imageHasLoaded = img => {
	img.classList.remove(lazyLoadingImageClass);
	img.parentNode.classList.remove(lazyLoadingWrapperClass);
};

const loadImage = img => {
	img.addEventListener('load', () => {
		// HACK: rather arbitrary, needed to get the fading to always work (possibly classes being removed to quickly)
		setTimeout(imageHasLoaded.bind(null, img), 13);
	});

	// add the src/srcset attributes back in
	Array.from(img.attributes).forEach(attr => {
		if (/^data-src(set)?$/.test(attr.name)) {
			img.setAttribute(attr.name.replace('data-', ''), attr.value);
			img.removeAttribute(attr.name);
		}
	});
};

const intersectionCallback = (observer, changes) => {
	changes.forEach(change => {
		if (change.isIntersecting || change.intersectionRatio > 0) {
			loadImage(change.target);
			observer.unobserve(change.target);
		}
	});
};

const observeIntersection = (img, observer) => {
	if (observer) {
		observer.observe(img);
	} else {
		loadImage(img);
	}

	img.setAttribute('data-n-image-lazy-load-js', '');
};



/**
 * @param {Object} [opts = {}]
 * @param {Element} [opts.root = document] - Where in the DOM to search for images
 */
module.exports = ({ root = document } = { }) => {
	const verticalMargin = window.FT && window.FT.flags && window.FT.flags.get('imgLazyLoadThreshold') || '0px';

	const observer = window.IntersectionObserver
		? new window.IntersectionObserver(intersectionCallback, {
			rootMargin: `${verticalMargin} 0px ${verticalMargin} 0px`
		})
		: null;

	const targets = root.querySelectorAll(`.${lazyLoadingImageClass}`);

	targets.forEach((img) => {
		if (img.hasAttribute('data-n-image-lazy-load-js') === false) {
			observeIntersection(img, observer);
		}
	});
};
