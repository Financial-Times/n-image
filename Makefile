install:
	obt install --verbose

verify:
	nbt verify --skip-layout-checks --skip-dotenv-check

test: verify
