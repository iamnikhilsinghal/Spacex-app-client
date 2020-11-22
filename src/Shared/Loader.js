import React, { Component } from 'react';
import Loadera from 'react-loader';
import './loader.css';
export default class Loader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: this.props.loaded,
    };
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
          <Loadera
            lines={13}
            length={20}
            width={10}
            radius={30}
            corners={1}
            rotate={0}
            direction={1}
            color='#384cbc'
            speed={1}
            trail={60}
            shadow={false}
            hwaccel={false}
            className='spinner'
            zIndex={2e9}
            top='50%'
            left='50%'
            scale={1.0}
            loadedClassName='loadedContent'
          />
        </div>
      </React.Fragment>
    );
  }
}
