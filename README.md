![logo](https://raw.githubusercontent.com/Jac21/react-cinemagraph-demo/master/public/media/logo.png)

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
![build workflow](https://github.com/Jac21/react-cinemagraph/actions/workflows/build.yml/badge.svg)
[![npm](https://img.shields.io/npm/v/react-cinemagraph.svg)](https://www.npmjs.com/package/react-cinemagraph)
[![donate](https://img.shields.io/badge/%24-Buy%20me%20a%20coffee-ff69b4.svg)](https://www.buymeacoffee.com/jac21)

Generic [Cinemagraph](https://en.wikipedia.org/wiki/Cinemagraph) component, built for React.

## The problem 🤔

You want a generic, adaptive, React-friendly, and customizable Cinemagraph-style component within your React application.

## This solution ✅

This component - `react-cinemagraph`!

## The demo 📽

Right here - https://jac21.github.io/react-cinemagraph-demo/

## Installation 🎥

```
$ npm i react-cinemagraph
```

## Usage 🎬

```javascript
import React from 'react';
import { Cinemagraph } from 'react-cinemagraph';

class Demo extends Component {
  state = {
    height: 50,
    maxHeight: 100,
    fallbackImage: './demo/assets/Disco.jpg',
    fallbackImageAlt: 'Disco',
    mp4Source: './demo/assets/Disco.mp4',
    webmSource: './demo/assets/Disco.webm',
    effects: {
      grayscale: 1,
      sepia: 0.35,
      blur: 2,
      contrast: 1.1
    }
  };

  render() {
    return (
      <div>
        <Cinemagraph
          height={this.state.height}
          maxHeight={this.state.maxHeight}
          fallbackImage={this.state.fallbackImage}
          fallbackImageAlt={this.state.fallbackImageAlt}
          mp4Source={this.state.mp4Source}
          webmSource={this.state.webmSource}
          effects={this.state.effects}
        />
      </div>
    );
  }
}
```

Alternatively (and [preferably, if using webpack](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-images-fonts-and-files)):

```javascript
import React from 'react';
import { Cinemagraph } from 'react-cinemagraph';

import discoJpg from './assets/Disco.jpg';
import discoMp4 from './assets/Disco.mp4';
import discoWebM from './assets/Disco.webm';

class Demo extends Component {
  state = {
    height: 50,
    maxHeight: 100,
    fallbackImage: discoJpg,
    fallbackImageAlt: 'Disco',
    mp4Source: discoMp4,
    webmSource: discoWebM,
    effects: {
      grayscale: 1,
      sepia: 0.35,
      blur: 2,
      contrast: 1.1
    }
  };

  render() {
    return (
      <div>
        <Cinemagraph
          height={this.state.height}
          maxHeight={this.state.maxHeight}
          fallbackImage={this.state.fallbackImage}
          fallbackImageAlt={this.state.fallbackImageAlt}
          mp4Source={this.state.mp4Source}
          webmSource={this.state.webmSource}
          effects={this.state.effects}
        />
      </div>
    );
  }
}
```

## Props 🎞

Every required and optional prop from [`react-cinemagraph`](https://github.com/Jac21/react-cinemagraph#props) (height, maxHeight, fallbackImage, fallbackImageAlt, mp4Source, webmSource, effects)

## height

Type: Number **(Is Required)**

Height of Cinemagraph in _VW_ units relative to window's width.

## maxHeight

Type: Number **(Is Required)**

Maximum height of Cinemagraph in _VH_ units relative to window's height.

## fallbackImage

Type: String

File path for the fallback image to be rendered on unsupported browsers.

## fallbackImageAlt

Type: String

'alt' property for the aforementioned fallback image.

## mp4Source

Type: String

File path for the Cinemagraph's mp4 file-type video source

## webmSource

Type: String

File path for the Cinemagraph's WebM file-type video source

## effects

Type: Object

CSS filter values to apply to the Cinemagraph's video in a composable way.

Supported keys:

- `blur`
- `brightness`
- `contrast`
- `dropShadow`
- `grayscale`
- `hueRotate`
- `invert`
- `opacity`
- `saturate`
- `sepia`

Examples:

```javascript
effects={{
  grayscale: 1,
  sepia: 0.35,
  blur: 4,
  contrast: 1.1,
  hueRotate: 45,
  dropShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
}}
```

Numeric `blur` values are treated as pixels, numeric `hueRotate` values are treated as degrees, and the remaining numeric effect values are passed through directly.

## Deprecated props

`isBlackAndWhite`, `isSepia`, and `isBlurred` still work for backwards compatibility, but they are deprecated in favor of `effects`. If both are provided, explicit `effects` values win.
