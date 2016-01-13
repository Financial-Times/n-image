install:
	obt install --verbose

verify:
	nbt verify --skip-layout-checks

test: verify
