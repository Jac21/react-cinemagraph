# react-cinemagraph

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Generic [Cinemagraph](https://en.wikipedia.org/wiki/Cinemagraph) component, built for React.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

## The problem

You want a generic, adaptive, React-friendly, and customizable Cinemagraph-style component within your React application.

## This solution

This component - `react-cinemagraph`!

## Installation

```
$ npm install react-cinemagraph
```

## Usage

```javascript
import React from 'react';
import { Cinemagraph } from 'react-cinemagraph';

class Demo extends Component {
  state = {
    fallbackImage: './demo/assets/Disco.jpg',
    fallbackImageAlt: 'Disco',
    mp4Source: './demo/assets/Disco.mp4',
    webmSource: './demo/assets/Disco.webm'
  };

  render() {
    return (
      <div>
        <Cinemagraph
          fallbackImage={this.state.fallbackImage}
          fallbackImageAlt={this.state.fallbackImageAlt}
          mp4Source={this.state.mp4Source}
          webmSource={this.state.webmSource}
        />{' '}
      </div>
    );
  }
}
```

## Props

Every prop from [`react-cinemagraph`](https://github.com/Jac21/react-cinemagraph#props) (fallbackImage, fallbackImageAlt, mp4Source, webmSource)

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
