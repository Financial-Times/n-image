include n.Makefile

unit-test:
	mocha --require tests/setup --recursive --reporter spec tests

test: verify unit-test
