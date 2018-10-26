import expect from 'expect';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { Cinemagraph } from '../src/index';

describe('Cinemagraph', () => {
  it('renders a div-wrapped video with default properties', () => {
    expect(renderToStaticMarkup(<Cinemagraph height={50} maxHeight={100} />)).toContain(
      '<div class="homepage-hero-module"><div class="video-container" style="height:50vw;max-height:100vh"><div class="poster hidden"><img/> </div> <div class="filter"></div> <video autoplay="" playsinline="" muted="" loop="" class="\n              fillWidth\n              \n              \n              \n        "><source type="video/mp4"/> Your browser does not support the video tag. I suggest you upgrade your browser. <source type="video/webm"/>Your browser does not support the video tag. I suggest you upgrade your browser.</video> </div> </div>'
    );
  });
});
