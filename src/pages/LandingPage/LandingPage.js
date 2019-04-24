import React, { Component } from 'react';

import './LandingPage.css';

import Lander from '../../components/Lander/Lander';
import ContentContainer from '../../components/ContentContainer/ContentContainer';

export default class LandingPage extends Component {
  render() {
    return (
      <div className='LandingPage'>
        <Lander />
        <ContentContainer />
      </div>
    );
  }
}
