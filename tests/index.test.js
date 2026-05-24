/* eslint-disable no-console */
import React from 'react';

import { Cinemagraph } from '../src/index';
import {
  buildFilterValue,
  resetDeprecatedEffectWarnings,
  warnDeprecatedEffectProps
} from '../src/Cinemagraph';

const globalScope = typeof globalThis !== 'undefined' ? globalThis : window;

if (!globalScope.TextEncoder) {
  globalScope.TextEncoder = function TextEncoder() {};
  globalScope.TextEncoder.prototype.encode = function encode(value) {
    const bytes = [];

    for (let index = 0; index < value.length; index += 1) {
      bytes.push(value.charCodeAt(index));
    }

    return new Uint8Array(bytes);
  };
}

// eslint-disable-next-line import/no-dynamic-require, global-require
const { renderToStaticMarkup } = require('react-dom/server');

const assertEqual = (actual, expected) => {
  if (actual !== expected) {
    throw new Error(`Expected "${expected}" but received "${actual}"`);
  }
};

const assertIncludes = (actual, expected) => {
  if (!actual.includes(expected)) {
    throw new Error(`Expected "${actual}" to include "${expected}"`);
  }
};

const renderCinemagraph = props => renderToStaticMarkup(
  React.createElement(Cinemagraph, {
    height: 50,
    maxHeight: 100,
    ...props
  })
);

describe('Cinemagraph', () => {
  afterEach(() => {
    resetDeprecatedEffectWarnings();
  });

  it('renders the cinemagraph wrapper and video container', () => {
    const markup = renderCinemagraph();

    assertIncludes(markup, '<div class="homepage-hero-module">');
    assertIncludes(markup, 'style="height:50vw;max-height:100vh"');
    assertIncludes(markup, '<div class="filter"></div>');
    assertIncludes(markup, '<video');
    assertIncludes(markup, 'class="fillWidth"');
  });

  it('builds a composed CSS filter string from the effects prop', () => {
    assertEqual(
      buildFilterValue({
        grayscale: true,
        sepia: '60%',
        blur: 4,
        contrast: 1.2,
        hueRotate: 45,
        dropShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
      }),
      'grayscale(1) sepia(60%) blur(4px) contrast(1.2) hue-rotate(45deg) drop-shadow(0 8px 24px rgba(0, 0, 0, 0.25))'
    );
  });

  it('renders composed effects as inline video styles', () => {
    const effects = {
      grayscale: true,
      sepia: '60%',
      blur: 4,
      hueRotate: 45
    };
    const filterValue = buildFilterValue(effects);
    const markup = renderCinemagraph({ effects });

    assertIncludes(markup, `-webkit-filter:${filterValue}`);
    assertIncludes(markup, `filter:${filterValue}`);
  });

  it('maps deprecated effect props to the new effects pipeline', () => {
    const filterValue = buildFilterValue({}, {
      isBlackAndWhite: true,
      isSepia: true,
      isBlurred: true
    });
    const markup = renderCinemagraph({
      isBlackAndWhite: true,
      isSepia: true,
      isBlurred: true
    });

    assertEqual(filterValue, 'grayscale(1) sepia(1) blur(5px)');
    assertIncludes(markup, `filter:${filterValue}`);
  });

  it('prefers explicit effects values over deprecated aliases', () => {
    assertEqual(
      buildFilterValue(
        {
          sepia: 0.4,
          blur: '12px'
        },
        {
          isSepia: true,
          isBlurred: true
        }
      ),
      'sepia(0.4) blur(12px)'
    );
  });

  it('warns once per deprecated effect prop', () => {
    const originalWarn = console.warn;
    const warnings = [];

    console.warn = message => warnings.push(message);

    try {
      warnDeprecatedEffectProps({
        isBlackAndWhite: true,
        isSepia: true
      });
      warnDeprecatedEffectProps({
        isBlackAndWhite: true,
        isBlurred: true
      });
    } finally {
      console.warn = originalWarn;
    }

    assertEqual(
      warnings.join('\n'),
      [
        'The `isBlackAndWhite` prop is deprecated. Use `effects={{ grayscale: 1 }}` instead.',
        'The `isSepia` prop is deprecated. Use `effects={{ sepia: 1 }}` instead.',
        'The `isBlurred` prop is deprecated. Use `effects={{ blur: 5 }}` instead.'
      ].join('\n')
    );
  });
});
