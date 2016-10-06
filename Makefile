include n.Makefile

transpile:
	babel src -d dist --presets=es2015,react

unit-test:
	mocha --require tests/setup --recursive --reporter spec tests

test: verify unit-test
