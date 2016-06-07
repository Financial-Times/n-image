import imagesLoaded from 'imagesLoaded';

const lazyLoaderClass = 'n-image--lazy-loader';
const imageLoadingClass = 'n-image--loading';

const imageHasLoaded = instance =>
	instance.elements.forEach(img => img.classList.remove(imageLoadingClass))

const loadImage = img => {
	// add the src/srcset attribtues back in
	[...img.attributes]
		.forEach(attr => {
			if (/^data-src(set)?$/.test(attr.name)) {
				img.setAttribute(attr.name.replace('data-', ''), attr.value);
				img.removeAttribute(attr.name);
			}
		});
	imagesLoaded(img, imageHasLoaded);
};

const intersectionCallback = changes => {
	changes.forEach(change => {
		const observedImg = change.target;
		loadImage(observedImg)
		observer.unobserve(observedImg);
	});
};

const observeIntersection = img => {
	if (IntersectionObserver) {
		const observer = new IntersectionObserver(
			intersectionCallback,
			{ rootMargin: '0px' }
		);
		observer.observe(img);
	} else {
		loadImage(img);
	}
};

const lazyLoad = () => {
	[...document.querySelectorAll(`.${lazyLoaderClass} .n-image`)]
		.forEach(observeIntersection);
};

export default lazyLoad;
