import React, { Component } from 'react';
import t from 'prop-types';
import classNames from 'classnames';

import './css/styles.css';

class Cinemagraph extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.scaleVideoContainer();

    this.initBannerVideoSize('.video-container .poster img');
    this.initBannerVideoSize('.video-container .filter');
    this.initBannerVideoSize('.video-container video');

    window.addEventListener('resize', () => {
      this.scaleVideoContainer();
      this.scaleBannerVideoSize('.video-container .poster img');
      this.scaleBannerVideoSize('.video-container .filter');
      this.scaleBannerVideoSize('.video-container video');
    });
  }

  scaleVideoContainer() {
    const height = window.innerHeight + 5;
    const unitHeight = `${parseInt(height, 10)}px`;
    document.getElementsByClassName(
      'homepage-hero-module'
    )[0].style.height = unitHeight;
  }

  initBannerVideoSize(elements) {
    document.querySelectorAll(elements).forEach(element => {
      element.setAttribute('data-height', `${parseInt(element.height, 10)}px`);
      element.setAttribute('data-width', `${parseInt(element.width, 10)}px`);
    });

    this.scaleBannerVideoSize(elements);
  }

  scaleBannerVideoSize(elements) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight + 5;
    let videoWidth = 0;
    let videoHeight = 0;

    document.querySelectorAll(elements).forEach(element => {
      const videoAspectRatio =
        element.getAttribute('data-height') /
        element.getAttribute('data-width');

      this.innerWidth = windowWidth;

      if (windowWidth < 1000) {
        videoHeight = windowHeight;
        videoWidth = videoHeight / videoAspectRatio;
        document.querySelectorAll('body')[0].style.marginTop = 0;
        document.querySelectorAll('body')[0].style.marginLeft = `${-(
          videoWidth - windowWidth
        ) / 2}px`;

        document.querySelectorAll('body')[0].innerWidth = `${videoWidth}px`;
        document.querySelectorAll('body')[0].innerHeight = `${videoHeight}px`;
      }

      document
        .querySelectorAll('.homepage-hero-module .video-container video')[0]
        .classList.add('fadeIn');
      document
        .querySelectorAll('.homepage-hero-module .video-container video')[0]
        .classList.add('animated');
    });
  }

  render() {
    const videoClass = classNames({
      fillWidth: true,
      'cinemagraph-black-and-white': this.props.isBlackAndWhite,
      'cinemagraph-sepia': this.props.isSepia,
      'cinemagraph-blur': this.props.isBlurred
    });

    return (
      <div className="homepage-hero-module">
        <div className="video-container">
          <div className="poster hidden">
            <img
              src={this.props.fallbackImage}
              alt={this.props.fallbackImageAlt}
            />{' '}
          </div>{' '}
          <div className="filter" />{' '}
          <video autoPlay muted loop className={videoClass}>
            <source src={this.props.mp4Source} type="video/mp4" /> Your browser
            does not support the video tag. I suggest you upgrade your browser.{' '}
            <source src={this.props.webmSource} type="video/webm" />Your browser
            does not support the video tag. I suggest you upgrade your browser.
          </video>{' '}
        </div>{' '}
      </div>
    );
  }
}

Cinemagraph.propTypes = {
  fallbackImage: t.string,
  fallbackImageAlt: t.string,
  mp4Source: t.string,
  webmSource: t.string,
  isBlackAndWhite: t.bool,
  isSepia: t.bool,
  isBlurred: t.bool
};

export { Cinemagraph };
export default Cinemagraph;