import imagesLoaded from 'imagesloaded';

const imageLazyLoadingClass = 'n-image--lazy-loading';

const imageHasLoaded = instance =>
	instance.elements.forEach(img =>
		// NOTE: rather arbitrary pause, needed for the fading to work properly (guessing if the gap between changing
		// the src/srcset attribtues and the class is too quick, css isn't applied correctly)
		// if the fading doesn't always work, this might need increasing
		setTimeout(() => img.classList.remove(imageLazyLoadingClass), 13)
	);

const loadImage = (img, opts) => {
	// add the src/srcset attribtues back in
	[...img.attributes]
		.forEach(attr => {
			if (/^data-src(set)?$/.test(attr.name)) {
				img.setAttribute(attr.name.replace('data-', ''), attr.value);
				img.removeAttribute(attr.name);
			}
		});
	if (opts.dontFade) {
		img.classList.remove(imageLazyLoadingClass);
	} else {
		imagesLoaded(img, imageHasLoaded);
	}
};

// NOTE: `function` syntax, so maintains `this`
const intersectionCallback = (observer, changes, opts) => {
	changes.forEach(change => {
		const observedImg = change.target;
		loadImage(observedImg, opts);
		observer.unobserve(observedImg);
	});
};

const observeIntersection = (opts, img) => {
	if (window.IntersectionObserver) {
		const observer = new IntersectionObserver(
			function (changes) {
				intersectionCallback(this, changes, opts);
			},
			{ rootMargin: '0px' }
		);
		observer.observe(img);
	} else {
		loadImage(img, opts);
	}
};

const lazyLoad = (opts = { dontFade: false }) => {
	[...document.querySelectorAll(`.${imageLazyLoadingClass}`)]
		.forEach(observeIntersection.bind(null, opts));
};

export default lazyLoad;
