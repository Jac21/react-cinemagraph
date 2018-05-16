import t from 'prop-types';
import React from 'react';

import './css/styles.css';

const Cinemagraph = props => {
  return (
    <div className="homepage-hero-module">
      <div className="video-container">
        <div className="poster hidden">
          <img src={props.fallbackImage} alt={props.fallbackImageAlt} />{' '}
        </div>{' '}
        <div className="filter" />{' '}
        <video autoPlay muted loop className="fillWidth">
          <source src={props.mp4Source} type="video/mp4" /> Your browser does
          not support the video tag. I suggest you upgrade your browser.{' '}
          <source src={props.webmSource} type="video/webm" />Your browser does
          not support the video tag. I suggest you upgrade your browser.
        </video>{' '}
      </div>{' '}
    </div>
  );
};

Cinemagraph.propTypes = {
  fallbackImage: t.string,
  fallbackImageAlt: t.string,
  mp4Source: t.string,
  webmSource: t.string
};

export default Cinemagraph;
