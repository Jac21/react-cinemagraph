import expect from 'expect';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import Cinemagraph from '../src/index';

describe('Cinemagraph', () => {
  let node;

  beforeEach(() => {
    node = document.createElement('div');
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it('displays a welcome message', () => {
    render(<Cinemagraph />, node, () => {
      expect(node.innerHTML).toContain('video');
    });
  });
});
