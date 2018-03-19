module.exports = {
	eventListenOptionSupported: (option) => {
		let supported = false;

		try {
			const options = Object.defineProperty({}, option, {
				get: () => {
					supported = true;
				}
			});

			window.addEventListener('test', options, options);
			window.removeEventListener('test', options, options);
		} catch (err) {
			supported = false;
		}

		return supported;
	}
};
