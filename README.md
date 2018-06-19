# react-cinemagraph

[![CircleCI](https://circleci.com/gh/Jac21/react-cinemagraph.svg?style=shield)](https://circleci.com/gh/Jac21/react-cinemagraph)
[![npm](https://img.shields.io/npm/v/react-cinemagraph.svg)](https://www.npmjs.com/package/react-cinemagraph)
[![donate](https://img.shields.io/badge/%24-Buy%20me%20a%20coffee-ff69b4.svg)](https://www.buymeacoffee.com/jac21)

Generic [Cinemagraph](https://en.wikipedia.org/wiki/Cinemagraph) component, built for React.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

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
    fallbackImage: './demo/assets/Disco.jpg',
    fallbackImageAlt: 'Disco',
    mp4Source: './demo/assets/Disco.mp4',
    webmSource: './demo/assets/Disco.webm',
    isBlackAndWhite: false,
    isSepia: false,
    isBlurred: false
  };

  render() {
    return (
      <div>
        <Cinemagraph
          fallbackImage={this.state.fallbackImage}
          fallbackImageAlt={this.state.fallbackImageAlt}
          mp4Source={this.state.mp4Source}
          webmSource={this.state.webmSource}
          isBlackAndWhite={this.state.isBlackAndWhite}
          isSepia={this.state.isSepia}
          isBlurred={this.state.isBlurred}
        />
      </div>
    );
  }
}
```

## Props 🎞

Every prop from [`react-cinemagraph`](https://github.com/Jac21/react-cinemagraph#props) (fallbackImage, fallbackImageAlt, mp4Source, webmSource, isBlackAndWhite, isSepia, isBlurred)

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

## isBlackAndWhite

Type: Boolean

Option to have a black-and-white filter applied to the Cinemagraph

## isSepia

Type: Boolean

Option to have a sepia filter applied to the Cinemagraph

## isBlurred

Type: Boolean

Option to have a blur filter applied to the Cinemagraph
