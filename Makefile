include n.Makefile

transpile:
	babel src -d dist

unit-test:
	mocha --require tests/setup --recursive --reporter spec tests

test: verify unit-test
