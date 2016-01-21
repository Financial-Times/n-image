n-image [![Build Status](https://travis-ci.org/Financial-Times/n-image.svg?branch=master)](https://travis-ci.org/Financial-Times/n-image)
=================

Bower component for responsive images.

NOTE: This implementation is likely to change as we discover more scenarios that need to be covered by responsive images.

## Usage

The image component allows you to specify different size images to be used at different breakpoints. It's essentially a wrapper around the new `<picture></picture>` element. Currently we're using the latest version of picturefill to polyfill the picture element for older browsers. This will be removed when a picture polyfill is added to the polyfill service in the near future.

The following image object is expected by the component (when used as a *bower component*) -

```javascript
{
	url: 'someurl', //This will be passed into the image service
	alt: 'your alt text',
	class: 'any-bespoke-classes you-want-to-add', //Optional added to <picture> element along with n-image
	srcset: {
		fallback: 500, //Optional pixel width for fallback image.
		default: 200, //The default image size. This will be shown if non of the breakpoint sizes are matched or some haven't been specified
		s: 300,
		m: 500,
		l: 700,
		xl: 1000
	}
}
```

Arguments are passed to the React component (when used as a *node package*) -

```
<NImage
    url="https://ak-hdl.buzzfed.com/static/2014-06/6/12/enhanced/webdr08/enhanced-21313-1402070821-11.jpg"
    srcset={{ s: 120, l: 160 }}
    isImgServiceUrl={false}
    imageServiceParams={{ tint: 'FFF1E0' }}
    alt="A Cat"
    picClass="container__picture"
    imgClass="container__image" />
```

The arguments should be of the following format:

 * `{string} url`: Image URL
 * `{Object} srcset`
  * `{number} srcset.fallback`: Optional pixel width for fallback image.
  * `{number} srcset.default`: The default image size. This will be shown if non of the breakpoint sizes are matched or some haven't been specified
  *	`{number} srcset.s`
  * `{number} srcset.m`
  * `{number} srcset.l`
  * `{number} srcset.xl`
 * `{boolean} [isImgServiceUrl=false]`: Boolean value dictates whether url will use image service or not
 * `{Object} [imageServiceParams={}]`: Params to use with the image services
 * `{string} [alt='']`: Optional alt text
 * `{string} [picClass='']`: Any bespoke classes you want to add //Optional added to <picture> element along with n-image
 * `{string} [imgClass='']`: Any bespoke classes you want to add //Optional added to <img> elements along with n-image__img

The `s`, `m`, `l`, `xl` size match to those used in o-grid and the relevant width images will be loaded.

The `fallback` property should only be included if the image must be shown in all scenarios. The suggested usage of picturefill is that browsers without picture support or javascript should only show the alt text. Including the `fallback` will result in a double image download in certain scenarios and so should only be used when required.

A breakpoint definition will always trump the default declaration. For example with the following options -

```javascript
{
	url: 'someurl', //This will be passed into the image service
	alt: 'your alt text',
	srcset: {
		default: 400,
		l: 700
	}
}
```
A `400px` image will be shown until you hit the `l` breakpoint. At which point a `700px` image will be shown.

In certain scenarios, images may only be required for larger breakpoint sizes. In this case you can drop the `default` and `s` options. You will still need to `display:none` the picture element at the `s` breakpoint but it means no image will be requested.

###Installing

```
make install
```

###Using

####JS:
```
	require('n-image');
```

####SCSS:
`@import 'n-image/main';`

####HTML:

```
{{>n-image/templates/image}}
```

### Testing

Use the [Next Styleguide Demoer](https://github.com/Financial-Times/next-style-guide-demoer) to test, by `bower link`-ing this component into it and updating [the data json file](./demos/data.json) with any extra variants.
