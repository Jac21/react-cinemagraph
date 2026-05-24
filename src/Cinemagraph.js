import React, { Component } from 'react';
import {
  number, string, bool, any, shape, oneOfType
} from 'prop-types';

import './styles.css';

const effectValuePropType = oneOfType([number, string, bool]);

const deprecatedEffectPropMap = Object.freeze({
  isBlackAndWhite: {
    effectName: 'grayscale',
    replacementValue: 1
  },
  isSepia: {
    effectName: 'sepia',
    replacementValue: 1
  },
  isBlurred: {
    effectName: 'blur',
    replacementValue: 5
  }
});

const effectRenderOrder = [
  'grayscale',
  'sepia',
  'blur',
  'brightness',
  'contrast',
  'saturate',
  'hueRotate',
  'invert',
  'opacity',
  'dropShadow'
];

const deprecatedEffectWarnings = new Set();

const effectNamesToCssFilters = Object.freeze({
  blur: 'blur',
  brightness: 'brightness',
  contrast: 'contrast',
  dropShadow: 'drop-shadow',
  grayscale: 'grayscale',
  hueRotate: 'hue-rotate',
  invert: 'invert',
  opacity: 'opacity',
  saturate: 'saturate',
  sepia: 'sepia'
});

export const effectsPropType = shape({
  blur: oneOfType([number, string]),
  brightness: effectValuePropType,
  contrast: effectValuePropType,
  dropShadow: string,
  grayscale: effectValuePropType,
  hueRotate: oneOfType([number, string]),
  invert: effectValuePropType,
  opacity: effectValuePropType,
  saturate: effectValuePropType,
  sepia: effectValuePropType
});

const normalizeEffectValue = (effectName, rawValue) => {
  if (rawValue === undefined || rawValue === null || rawValue === false) {
    return null;
  }

  if (rawValue === true) {
    return 1;
  }

  if (effectName === 'blur' && typeof rawValue === 'number') {
    return `${rawValue}px`;
  }

  if (effectName === 'hueRotate' && typeof rawValue === 'number') {
    return `${rawValue}deg`;
  }

  return rawValue;
};

export const getDeprecatedEffects = (props = {}) => Object.entries(deprecatedEffectPropMap).reduce(
  (deprecatedEffects, [propName, config]) => {
    if (!props[propName]) {
      return deprecatedEffects;
    }

    return {
      ...deprecatedEffects,
      [config.effectName]: config.replacementValue
    };
  },
  {}
);

export const buildFilterValue = (effects = {}, deprecatedProps = {}) => {
  const composedEffects = {
    ...getDeprecatedEffects(deprecatedProps),
    ...effects
  };

  return effectRenderOrder
    .map(effectName => {
      const value = normalizeEffectValue(effectName, composedEffects[effectName]);

      if (value === null || value === '') {
        return null;
      }

      return `${effectNamesToCssFilters[effectName]}(${value})`;
    })
    .filter(Boolean)
    .join(' ');
};

export const warnDeprecatedEffectProps = (props = {}) => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  Object.entries(deprecatedEffectPropMap).forEach(([propName, config]) => {
    if (!props[propName] || deprecatedEffectWarnings.has(propName)) {
      return;
    }

    // eslint-disable-next-line no-console
    console.warn(
      `The \`${propName}\` prop is deprecated. Use \`effects={{ ${config.effectName}: ${config.replacementValue} }}\` instead.`
    );
    deprecatedEffectWarnings.add(propName);
  });
};

export const resetDeprecatedEffectWarnings = () => {
  deprecatedEffectWarnings.clear();
};

class Cinemagraph extends Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    warnDeprecatedEffectProps(this.props);
    this.initBannerVideoSize('.video-container .poster img');
    this.initBannerVideoSize('.video-container .filter');
    this.initBannerVideoSize('.video-container video');

    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    warnDeprecatedEffectProps(this.props);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.scaleBannerVideoSize('.video-container .poster img');
    this.scaleBannerVideoSize('.video-container .filter');
    this.scaleBannerVideoSize('.video-container video');
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
      const videoAspectRatio = element.getAttribute('data-height') / element.getAttribute('data-width');

      if (windowWidth < 1000) {
        videoHeight = windowHeight;
        videoWidth = videoHeight / videoAspectRatio;
        document.querySelectorAll('body')[0].style.marginTop = 0;
        document.querySelectorAll('body')[0].style.marginLeft = `${-(videoWidth - windowWidth)
          / 2}px`;

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
    const {
      height,
      maxHeight,
      fallbackImage,
      fallbackImageAlt,
      mp4Source,
      webmSource,
      effects,
      isBlackAndWhite,
      isSepia,
      isBlurred
    } = this.props;

    const filterValue = buildFilterValue(effects, {
      isBlackAndWhite,
      isSepia,
      isBlurred
    });
    const videoStyle = filterValue
      ? {
        WebkitFilter: filterValue,
        filter: filterValue
      }
      : undefined;

    return (
      <React.StrictMode>
        <div className="homepage-hero-module">
          <div
            className="video-container"
            style={{
              height: `${height}vw`,
              maxHeight: `${maxHeight}vh`
            }}
          >
            <div className="poster hidden">
              <img src={fallbackImage} alt={fallbackImageAlt} />
            </div>
            <div className="filter" />
            <video
              autoPlay
              playsInline
              muted
              loop
              className="fillWidth"
              style={videoStyle}
            >
              <source src={mp4Source} type="video/mp4" />
              Your browser does not support the
              video tag. I suggest you upgrade your browser.
              <source src={webmSource} type="video/webm" />
              Your browser does not support
              the video tag. I suggest you upgrade your browser.
            </video>
          </div>
        </div>
      </React.StrictMode>
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
  effects: effectsPropType,
  isBlackAndWhite: bool,
  isSepia: bool,
  isBlurred: bool
};

export { Cinemagraph };
export default Cinemagraph;
