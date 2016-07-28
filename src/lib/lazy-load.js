const lazyLoadingModifier = 'lazy-loading';
const lazyLoadingImageClass = `n-image--${lazyLoadingModifier}`;
const lazyLoadingWrapperClass = `n-image-wrapper--${lazyLoadingModifier}`;

const imageHasLoaded = img => {
	img.classList.remove(lazyLoadingImageClass);
	img.parentNode.classList.remove(lazyLoadingWrapperClass);
	img.removeEventListener('load', imageHasLoaded);
};

const loadImage = img => {
	img.addEventListener('load', imageHasLoaded.bind(null, img));
	// add the src/srcset attribtues back in
	[...img.attributes]
		.forEach(attr => {
			if (/^data-src(set)?$/.test(attr.name)) {
				img.setAttribute(attr.name.replace('data-', ''), attr.value);
				img.removeAttribute(attr.name);
			}
		});
};

const intersectionCallback = (observer, changes) => {
	changes.forEach(change => {
		const observedImg = change.target;
		loadImage(observedImg);
		observer.unobserve(observedImg);
	});
};

const observeIntersection = ({ observer }, img) => {
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
export default ({ root = document } = { }) => {
	const observer = window.IntersectionObserver ?
		new IntersectionObserver(
			function (changes) {
				intersectionCallback(this, changes);
			}
		) :
		null;
	[...root.querySelectorAll(`.${lazyLoadingImageClass}`)]
		.filter(img => !img.hasAttribute('data-n-image-lazy-load-js'))
		.forEach(observeIntersection.bind(null, { observer }));
};
