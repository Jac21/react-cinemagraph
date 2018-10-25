import React, { Component } from 'react';
import { number, string, bool, any } from 'prop-types';

import './styles.css';

class Cinemagraph extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.initBannerVideoSize('.video-container .poster img');
    this.initBannerVideoSize('.video-container .filter');
    this.initBannerVideoSize('.video-container video');

    window.addEventListener('resize', () => {
      this.scaleBannerVideoSize('.video-container .poster img');
      this.scaleBannerVideoSize('.video-container .filter');
      this.scaleBannerVideoSize('.video-container video');
    });
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
        element.getAttribute('data-height') / element.getAttribute('data-width');

      this.innerWidth = windowWidth;

      if (windowWidth < 1000) {
        videoHeight = windowHeight;
        videoWidth = videoHeight / videoAspectRatio;
        document.querySelectorAll('body')[0].style.marginTop = 0;
        document.querySelectorAll('body')[0].style.marginLeft = `${-(videoWidth - windowWidth) /
          2}px`;

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
    return (
      <div className="homepage-hero-module">
        <div
          className="video-container"
          style={{
            height: `${this.props.height}vw`,
            maxHeight: `${this.props.maxHeight}vh`
          }}
        >
          <div className="poster hidden">
            <img src={this.props.fallbackImage} alt={this.props.fallbackImageAlt} />{' '}
          </div>{' '}
          <div className="filter" />{' '}
          <video
            autoPlay
            muted
            loop
            className={`
              fillWidth
              ${this.props.isBlackAndWhite ? 'cinemagraph-black-and-white' : ''}
              ${this.props.isSepia ? 'cinemagraph-sepia' : ''}
              ${this.props.isBlurred ? 'cinemagraph-blur' : ''}
        `}
          >
            <source src={this.props.mp4Source} type="video/mp4" /> Your browser does not support the
            video tag. I suggest you upgrade your browser.{' '}
            <source src={this.props.webmSource} type="video/webm" />Your browser does not support
            the video tag. I suggest you upgrade your browser.
          </video>{' '}
        </div>{' '}
      </div>
    );
  }
}

Cinemagraph.propTypes = {
  height: number.isRequired,
  maxHeight: number.isRequired,
  fallbackImage: any,
  fallbackImageAlt: string,
  mp4Source: any,
  webmSource: any,
  isBlackAndWhite: bool,
  isSepia: bool,
  isBlurred: bool
};

export { Cinemagraph };
export default Cinemagraph;
