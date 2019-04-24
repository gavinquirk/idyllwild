import React, { Component } from 'react';

import './Events.css';

export default class Events extends Component {
  componentDidMount() {
    console.log(this.props.expandState);
  }

  render() {
    return (
      <div
        className='Events'
        style={this.props.expandState ? { width: '80%' } : { width: '20%' }}
      >
        <span className='underline'>
          <h1
            className='heading heading-primary'
            onClick={this.props.expandEventsHandler}
          >
            Events
          </h1>
        </span>

        <div className='event'>
          <div className='event--heading'>
            <h4>Event Title</h4>
            <span className='event--date'>11/11/11</span>
          </div>
          <div className='event--content'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
            magni...
          </div>
        </div>

        <div className='event'>
          <div className='event--heading'>
            <h4>Event Title</h4>
            <span className='event--date'>11/11/11</span>
          </div>
          <div className='event--content'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
            magni...
          </div>
        </div>

        <div className='event'>
          <div className='event--heading'>
            <h4>Event Title</h4>
            <span className='event--date'>11/11/11</span>
          </div>
          <div className='event--content'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
            magni...
          </div>
        </div>

        <div className='event'>
          <div className='event--heading'>
            <h4>Event Title</h4>
            <span className='event--date'>11/11/11</span>
          </div>
          <div className='event--content'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
            magni...
          </div>
        </div>

        <div className='event'>
          <div className='event--heading'>
            <h4>Event Title</h4>
            <span className='event--date'>11/11/11</span>
          </div>
          <div className='event--content'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
            magni...
          </div>
        </div>
      </div>
    );
  }
}
