import imagesLoaded from 'imagesloaded';

const lazyLoadingModifier = 'lazy-loading';
const lazyLoadingImageClass = `n-image--${lazyLoadingModifier}`;
const lazyLoadingWrapperClass = `n-image-wrapper--${lazyLoadingModifier}`;

const imageHasLoaded = instance =>
	instance.elements.forEach(img =>
		// NOTE: rather arbitrary pause, needed for the fading to work properly (guessing if the gap between changing
		// the src/srcset attribtues and the class is too quick, css isn't applied correctly)
		// if the fading doesn't always work, this might need increasing
		setTimeout(() => {
			img.classList.remove(lazyLoadingImageClass);
			img.parentNode.classList.remove(lazyLoadingWrapperClass);
		}, 13)
	);

const loadImage = (img, { dontFade }) => {
	// add the src/srcset attribtues back in
	[...img.attributes]
		.forEach(attr => {
			if (/^data-src(set)?$/.test(attr.name)) {
				img.setAttribute(attr.name.replace('data-', ''), attr.value);
				img.removeAttribute(attr.name);
			}
		});
	if (dontFade) {
		imageHasLoaded({ elements: [img] });
	} else {
		imagesLoaded(img, imageHasLoaded);
	}
};

const intersectionCallback = (observer, changes, { dontFade }) => {
	changes.forEach(change => {
		const observedImg = change.target;
		loadImage(observedImg, { dontFade });
		observer.unobserve(observedImg);
	});
};

const observeIntersection = ({ dontFade, observer }, img) => {
	if (observer) {
		observer.observe(img);
	} else {
		loadImage(img, { dontFade });
	}
	img.setAttribute('data-n-image-lazy-load-js', '');
};

/**
 * @param {Object} [opts = {}]
 * @param {Element} [opts.root = document] - Where in the DOM to search for images
 * @param {boolean} [opts.dontFade = false] - Don't fade the images in (browser support for
 * fading - http://imagesloaded.desandro.com/#browser-support)
 */
export default ({ root = document, dontFade = false } = { }) => {
	const observer = window.IntersectionObserver ?
		new IntersectionObserver(
			function (changes) {
				intersectionCallback(this, changes, { dontFade });
			}
		) :
		null;
	[...root.querySelectorAll(`.${lazyLoadingImageClass}`)]
		.filter(img => !img.hasAttribute('data-n-image-lazy-load-js'))
		.forEach(observeIntersection.bind(null, { dontFade, observer }));
};
