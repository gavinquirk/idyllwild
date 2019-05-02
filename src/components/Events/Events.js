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
        <span className='heading-span underline'>
          <h1 className='heading heading-primary'>Events</h1>
          <i
            className='far fa-plus-square'
            style={this.props.expandState ? { opacity: '0' } : { opacity: '1' }}
            onClick={this.props.expandEventsHandler}
          />
        </span>

        <div className='event'>
          <div className='event--heading'>
            <h3>Event Title</h3>
            <span className='event--date'>11/11/11</span>
          </div>
          <div className='event--content'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
            assumenda, quibusdam facilis magni quam odit temporibus officia
            consequatur commodi quasi voluptatibus. Tenetur facilis minima quam
            repudiandae suscipit? Neque voluptatibus odit dolorum saepe dicta
            blanditiis perferendis beatae laboriosam quas mollitia voluptas
            inventore delectus quia voluptate excepturi, sint libero!
            Doloremque, cum nam!
          </div>
        </div>

        <div className='event'>
          <div className='event--heading'>
            <h3>Event Title</h3>
            <span className='event--date'>11/11/11</span>
          </div>
          <div className='event--content'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
            assumenda, quibusdam facilis magni quam odit temporibus officia
            consequatur commodi quasi voluptatibus. Tenetur facilis minima quam
            repudiandae suscipit? Neque voluptatibus odit dolorum saepe dicta
            blanditiis perferendis beatae laboriosam quas mollitia voluptas
            inventore delectus quia voluptate excepturi, sint libero!
            Doloremque, cum nam!
          </div>
        </div>

        <div className='event'>
          <div className='event--heading'>
            <h3>Event Title</h3>
            <span className='event--date'>11/11/11</span>
          </div>
          <div className='event--content'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
            assumenda, quibusdam facilis magni quam odit temporibus officia
            consequatur commodi quasi voluptatibus. Tenetur facilis minima quam
            repudiandae suscipit? Neque voluptatibus odit dolorum saepe dicta
            blanditiis perferendis beatae laboriosam quas mollitia voluptas
            inventore delectus quia voluptate excepturi, sint libero!
            Doloremque, cum nam!
          </div>
        </div>

        <div className='event'>
          <div className='event--heading'>
            <h3>Event Title</h3>
            <span className='event--date'>11/11/11</span>
          </div>
          <div className='event--content'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
            assumenda, quibusdam facilis magni quam odit temporibus officia
            consequatur commodi quasi voluptatibus. Tenetur facilis minima quam
            repudiandae suscipit? Neque voluptatibus odit dolorum saepe dicta
            blanditiis perferendis beatae laboriosam quas mollitia voluptas
            inventore delectus quia voluptate excepturi, sint libero!
            Doloremque, cum nam!
          </div>
        </div>

        <div className='event'>
          <div className='event--heading'>
            <h3>Event Title</h3>
            <span className='event--date'>11/11/11</span>
          </div>
          <div className='event--content'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
            assumenda, quibusdam facilis magni quam odit temporibus officia
            consequatur commodi quasi voluptatibus. Tenetur facilis minima quam
            repudiandae suscipit? Neque voluptatibus odit dolorum saepe dicta
            blanditiis perferendis beatae laboriosam quas mollitia voluptas
            inventore delectus quia voluptate excepturi, sint libero!
            Doloremque, cum nam!
          </div>
        </div>
      </div>
    );
  }
}
