install:
	obt install --verbose

verify:
	nbt verify --skip-layout-checks

test:
	obt build
	nbt verify --skip-layout-checks
