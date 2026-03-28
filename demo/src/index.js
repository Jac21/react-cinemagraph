import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

import { Cinemagraph } from '../../src';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  render() {
    const {
      height,
      maxHeight,
      fallbackImage,
      fallbackImageAlt,
      mp4Source,
      webmSource,
      isBlackAndWhite,
      isSepia,
      isBlurred
    } = this.state;

    return (
      <div>
        <Cinemagraph
          height={height}
          maxHeight={maxHeight}
          fallbackImage={fallbackImage}
          fallbackImageAlt={fallbackImageAlt}
          mp4Source={mp4Source}
          webmSource={webmSource}
          isBlackAndWhite={isBlackAndWhite}
          isSepia={isSepia}
          isBlurred={isBlurred}
        />
      </div>
    );
  }
}

const container = document.querySelector('#demo');
const root = createRoot(container);

root.render(<Demo />);
