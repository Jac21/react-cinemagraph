import React, { Component } from 'react';
import { render } from 'react-dom';

import { Cinemagraph } from '../../src';

class Demo extends Component {
  state = {
    height: 50,
    maxHeight: 100,
    fallbackImage: './demo/assets/HolidayLights/HolidayLights.jpg',
    fallbackImageAlt: 'Holiday Lights',
    mp4Source: './demo/assets/HolidayLights/HolidayLights.mp4',
    webmSource: './demo/assets/HolidayLights/HolidayLights.webm',
    isBlackAndWhite: false,
    isSepia: false,
    isBlurred: false
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
          isBlackAndWhite={this.state.isBlackAndWhite}
          isSepia={this.state.isSepia}
          isBlurred={this.state.isBlurred}
        />{' '}
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
