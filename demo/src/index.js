import React, { Component } from 'react';
import { render } from 'react-dom';

import Cinemagraph from '../../src';

class Demo extends Component {
  state = {
    loading: false,
    fallbackImage: './demo/assets/Disco.jpg',
    fallbackImageAlt: 'Disco',
    mp4Source: './demo/assets/Disco.mp4'
  };

  handleToggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  render() {
    return (
      <div>
        <h1> react - cinemagraph Demo </h1>{' '}
        <Cinemagraph
          loading={this.state.loading}
          fallbackImage={this.state.fallbackImage}
          fallbackImageAlt={this.state.fallbackImageAlt}
          mp4Source={this.state.mp4Source}
        />{' '}
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
