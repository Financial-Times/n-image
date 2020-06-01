#  n-Image [![Circle CI](https://circleci.com/gh/Financial-Times/n-image.svg?style=svg)](https://circleci.com/gh/Financial-Times/n-image)

⚠️ This component is deprecated. Please use a plain `<img>` or `<picture>` element to render images on the server and use [`o-lazy-load`](https://github.com/Financial-Times/o-lazy-load/) for client-side lazy-loading functionality. ⚠️

Bower component/Node module for responsive images.

## Usage

n-image provides an `ImagePresenter` class which can be used with the `presenter` helper from `n-handlebars`, and also exports [DEPRECATED] `Image` and [DEPRECATED] `Picture` React components


### Using with the n-handlebars presenter

By passing the context and some extra data options to the presenter helper, you will get a data structure returned to you. You can then use the partial provided in n-image/templates/image, or pick out the relevant properties.

#### Complex example for responsive images
```html
{{#nImagePresenter srcSet=image.url placeholder=image.ratio colspan='{ "default": 12, "M": 6, "L": 5.25 }' position='{"default": "left"}' widths="[131, 196, 276]" lazyLoad=true}}
	{{> n-image/templates/image }}
{{/nImagePresenter}}
```
results in

```html
<div class="n-image-wrapper" style="">
<img srcset="https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fprod-upp-image-read.ft.com%2F2f02641e-99ed-11e6-8f9b-70e3cabccfae?source=next&amp;fit=scale-down&amp;compression=best&amp;width=276 276w, https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fprod-upp-image-read.ft.com%2F2f02641e-99ed-11e6-8f9b-70e3cabccfae?source=next&amp;fit=scale-down&amp;compression=best&amp;width=196 196w, https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fprod-upp-image-read.ft.com%2F2f02641e-99ed-11e6-8f9b-70e3cabccfae?source=next&amp;fit=scale-down&amp;compression=best&amp;width=131 131w" sizes="(min-width: 1220px) 200px, (min-width: 980px) 158px, (min-width: 740px) 134px, calc(40vw - 16px)" role="presentation" alt="" class="n-image" data-n-image-lazy-load-js="" data-uid="5c380063e3.be7">
</div>
```

### Responsive images

There are two ways of rendering responsive images; a `srcset` and `sizes` attribute on the existing `img` element, or with the `picture` element.

### Image source
If `src` is present in the data sent to the presenter, it will output data for a non-responsive attribute, with no srcSet or size data returned.

#### `srcset` and `sizes` Attributes

The srcset and sizes syntaxes are used to provide the browser with a list of image sources that are identical apart from their size.

If `srcSet` (or `url` [DEPRECATED]) is provided, you MUST also provide `widths`.

You SHOULD also provide **either** an array of pre-calculated `sizes` **or** get n-image to calculate your sizes attribute for you by providing arrays of `colspan` **and** `position` data.  Colspan will default to `{'default': 12}` and position will default to `{'default': 'top'}`.

Sizes ensure that the smallest possible image is served up, e.g. if you have an image with widths [980,500,322] inside a container that has a grid colspan of 12 for default grid (i.e. mobile first) and 4 for large viewports, this will ensure that the user is served up the 500px image in large viewports rather than a 980px image shrunk to fit the box by the browser.

These are based on our standard breakpoints. Fuller examples of accepted data are documented in the [source code](src/presenters/image.js).

Your srcSet URL should look something like `http://prod-upp-image-read.ft.com/97d6966c-993a-11e6-8f9b-70e3cabccfae` as it will be passed through the [build-image-service-url](src/helpers/build-image-service-url.js) to add in extra data for the build service.

### Lazy loading

Images can be made to lazy load by adding `lazyLoad` to the data and setting it to `true`.

Ensure that `main-client` is included in your client-facing JS.

### CSS

A very minimal SASS file is available

```
@import 'n-image/main';
```

### DEPRECATED React components
```
import { Image } from '@financial-times/n-image';

<Image
	url="an/image.jpg"
	widths={[100, 200]}
	sizes={{ default: '100vw', XL: '100vw * 0.5' }}
	classes={['a-class', 'another-class']}
	alt="A useful description" />
```

renders to

```
<img
	class="n-image a-class another-class"
	alt="A useful description"
	sizes="(min-width: 1220px) 100vw * 0.5, 100vw"
	srcset="https://www.ft.com/__origami/service/image/v2/images/raw/an%2Fimage.jpg?source=next&fit=scale-down&compression=best&width=100 100w,
			https://www.ft.com/__origami/service/image/v2/images/raw/an%2Fimage.jpg?source=next&fit=scale-down&compression=best&width=200 200w" />
```

#### `picture` Element

The `picture` element is used when you need explicit control over which source is shown at set viewport sizes, i.e. images of different crops, zoom levels or aspect ratios are displayed at different breakpoints. e.g.

```
import { Picture } from '@financial-times/n-image';

<Picture
	urls={{ default: 'an/image.jpg', XL: 'another/image.jpg }}
	classes={['picture-class']}
	imgClasses={['img-class', 'another-img-class']}
	alt="A useful description" />
```

renders to

```
<picture class="n-image picture-class">
	<!--[if IE 9]><video style="display: none;"><![endif]-->
	<source srcset="an/image.jpg" media="(min-width: 1220px)" />
	<!--[if IE 9]></video><![endif]-->
	<img class="n-image__img img-class another-img-class" alt="A useful description" srcset="an/image.jpg" />
</picture>
```

## Demo page
`$ make demo`: Serves examples of the component locally (`http://localhost:5005`), using dummy data and in isolation from an app.

This is done on a simple express app which renders a single demo page that calls the partial to exhibit, populating it with data from a fixture.

## Pa11y
`$ make a11y`: Serves page of demo components, on which it runs [Pa11y](http://pa11y.org/) accessibility tests (errors flagging up accessibility infringements), which will also be run as part of the Continuous Integration (CI) process.
