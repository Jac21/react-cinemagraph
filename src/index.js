import t from 'prop-types'
import React, {Component} from 'react'

import './css/styles.css'

class Cinemagraph extends Component {
  static propTypes = {
    disabled: t.bool,
    loading: t.bool,
    fallbackImage: t.string,
    fallbackImageAlt: t.string,
    mp4Source: t.string
  }
  static defaultProps = {
    disabled: false,
    loading: false
  }
  render() {
    return(
    <div className="homepage-hero-module">
        <div className="video-container">
            <div className="poster hidden">
                <img src={this.props.fallbackImage} alt={this.props.fallbackImageAlt} />
            </div>
            <div className="filter"></div>
            <video autoPlay muted loop className="fillWidth">
                <source src={this.props.mp4Source} type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
            </video>
        </div>
    </div>
    )
  }
}

export default Cinemagraph
