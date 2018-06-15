import React, { Component } from 'react';
import { render } from 'react-dom';

import { Cinemagraph } from '../../src';

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
        />{' '}
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
