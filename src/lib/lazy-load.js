const lazyLoadingModifier = 'lazy-loading';
const lazyLoadingImageClass = `n-image--${lazyLoadingModifier}`;
const lazyLoadingWrapperClass = `n-image-wrapper--${lazyLoadingModifier}`;

const uid = () => (Date.now() * Math.random()).toString(16);
const performance = window.LUX || window.performance || window.msPerformance || window.webkitPerformance || window.mozPerformance;

//todo this stuff all lives (or should live) in n-ui but circular dependencies don't work
const perfMeasure = (name, start, end) => {
	if (performance && performance.measure) {
		performance.measure(name, start, end);
	}
};

const perfMark = name => {
	if (performance && performance.mark) {
		performance.mark(name);
	}
};

const broadcast = (eventName, data) => {
	// only do this 1% of the item so we don't flood Keen
	if(Math.random().toFixed(2) !== '0.01'){
		return;
	}
	const event = new CustomEvent(eventName, {detail:data});
	document.body.dispatchEvent(event);
};

const setUid = (img) => {
	const id = uid();
	img.setAttribute('data-uid', id);
	return id;
};

const getUid = (img) => {
	return img.getAttribute('data-uid');
};

const mark = (event, uid) => {
	perfMark(`${event}:${uid}`);
};

const measure = (uid) => {
	perfMeasure(uid, `START:${uid}`, `END:${uid}`);
};

const report = (name) => {
	if (performance && performance.getEntriesByName) {
		const entry = performance.getEntriesByName(name)[0];
		const selector = `img[data-uid="${name}"]`;
		const img = document.querySelector(selector);
		if(img && img.currentSrc){
			const eventData = {
				category: 'lazy-image-load',
				action: 'timing',
				data: {src:img.currentSrc, duration:entry.duration}
			};
			broadcast('oTracking.event', eventData);
		}
	}
};

const imageHasLoaded = img => {
	const uid = getUid(img);
	mark('END', uid);
	measure(uid);
	img.classList.remove(lazyLoadingImageClass);
	img.parentNode.classList.remove(lazyLoadingWrapperClass);
	img.removeEventListener('load', imageHasLoaded);
	report(uid);
};

const loadImage = img => {
	const uid = setUid(img);
	img.addEventListener('load', () => {
		// NOTE: rather arbitrary, needed to get the fading to always work (possibly classes being removed to quickly)
		setTimeout(imageHasLoaded.bind(null, img), 13);
	});
	mark('START', uid);
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
module.exports = ({ root = document } = { }) => {
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
