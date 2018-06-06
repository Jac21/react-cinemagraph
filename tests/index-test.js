import expect from 'expect';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { Cinemagraph } from '../src/index';

describe('Cinemagraph', () => {
  it('renders a div-wrapped video with default properties', () => {
    expect(renderToStaticMarkup(<Cinemagraph />)).toContain(
      '<div class="homepage-hero-module"><div class="video-container"><div class="poster hidden"><img/> </div> <div class="filter"></div> <video autoplay="" muted="" loop="" class="fillWidth"><source type="video/mp4"/> Your browser does not support the video tag. I suggest you upgrade your browser. <source type="video/webm"/>Your browser does not support the video tag. I suggest you upgrade your browser.</video> </div> </div>'
    );
  });
});
