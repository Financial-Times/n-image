include n.Makefile

transpile:
	babel src -d dist

unit-test:
	mocha --require tests/setup --recursive --reporter spec tests

test-build:
	rm -rf bower_components/n-image
	mkdir bower_components/n-image
	cp -r templates/ bower_components/n-image/templates/
	node-sass demos/src/demo.scss public/main.css --include-path bower_components

demo: test-build
	node demos/app
test: verify unit-test
