install:
	obt install --verbose

test:
	obt build
	obt verify
