#  N-Image [![Circle CI](https://circleci.com/gh/Financial-Times/n-image.svg?style=svg)](https://circleci.com/gh/Financial-Times/n-image)

Bower component/Node module for responsive images.

## Usage

There are two ways of rendering responsive images; a `srcset` and `sizes` attribute on the existing `img` element, or with the new `picture` element.

### `srcset` and `sizes` Attributes

The srcset and sizes syntaxes are used to provide the browser with a list of image sources that are identical apart from their size.

```
import Image form '@financial-times/n-image';

<Image 
    url="an/image.jpg" 
    widths={[100, 200]} 
    sizes={{ default: '100vw', XL: '100vw * 0.5' }}
    classes={['a-class', 'another-class']}
    alt="A useful description"  />
```

Renders as

```
<img 
    class="n-image a-class another-class"
    alt="A useful description"
    sizes="(min-width: 1220px) 100vw * 0.5, 100vw"
    srcset="https://next-geebee.ft.com/image/v1/images/raw/an%2Fimage.jpg?source=next&fit=scale-down&compression=best&width=100 100w,
            https://next-geebee.ft.com/image/v1/images/raw/an%2Fimage.jpg?source=next&fit=scale-down&compression=best&width=200 200w" />
```

See [the source](./templates/image.js) for properties the React element accepts

### `picture` Element

The `picture` element is used when you need explicit control over which source is shown at set viewport sizes, i.e. images of different crops, zoom levels or aspect ratios are displayed at different breakpoints

```
import Picture form '@financial-times/n-image';

<Picture 
    urls={{ default: 'an/image.jpg', XL: 'another/image.jpg }} 
    classes={['picture-class']} 
    imgClasses={['img-class', 'another-img-class']} 
    alt="A useful description" />
```

Renders as

```
<picture class="n-image picture-class">
    <!--[if IE 9]><video style="display: none;"><![endif]-->
    <source srcset="an/image.jpg" media="(min-width: 1220px)" />
	<!--[if IE 9]></video><![endif]-->
	<img class="n-image__img img-class another-img-class" alt="A useful description" srcset="an/image.jpg" />
</picture>
```

See [the source](./templates/picture.js) for properties the React element accepts

### CSS

A very minimal SASS file is available

```
@import 'n-image/main';
```
