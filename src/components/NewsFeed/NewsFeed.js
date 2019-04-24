import React, { Component } from 'react';

import './NewsFeed.css';

export default class NewsFeed extends Component {
  render() {
    return (
      <div
        className='NewsFeed'
        style={this.props.expandState ? { width: '20%' } : { width: '80%' }}
      >
        <span className='underline'>
          <h1
            className='heading heading-primary'
            onClick={this.props.expandEventsHandler}
          >
            News
          </h1>
        </span>

        <div className='article'>
          <div className='article--heading'>
            <h3 className='heading'>Article Title</h3>
            <span className='article--date'>11/11/11</span>
          </div>
          <div className='article--content'>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              assumenda, quibusdam facilis magni quam odit temporibus officia
              consequatur commodi quasi voluptatibus. Tenetur facilis minima
              quam repudiandae suscipit? Neque voluptatibus odit dolorum saepe
              dicta blanditiis perferendis beatae laboriosam quas mollitia
              voluptas inventore delectus quia voluptate excepturi, sint libero!
              Doloremque, cum nam!
            </p>
          </div>
        </div>
        <div className='article'>
          <div className='article--heading'>
            <h3 className='heading'>Article Title</h3>
            <span className='article--date'>11/11/11</span>
          </div>
          <div className='article--content'>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              assumenda, quibusdam facilis magni quam odit temporibus officia
              consequatur commodi quasi voluptatibus. Tenetur facilis minima
              quam repudiandae suscipit? Neque voluptatibus odit dolorum saepe
              dicta blanditiis perferendis beatae laboriosam quas mollitia
              voluptas inventore delectus quia voluptate excepturi, sint libero!
              Doloremque, cum nam!
            </p>
          </div>
        </div>
        <div className='article'>
          <div className='article--heading'>
            <h3 className='heading'>Article Title</h3>
            <span className='article--date'>11/11/11</span>
          </div>
          <div className='article--content'>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              assumenda, quibusdam facilis magni quam odit temporibus officia
              consequatur commodi quasi voluptatibus. Tenetur facilis minima
              quam repudiandae suscipit? Neque voluptatibus odit dolorum saepe
              dicta blanditiis perferendis beatae laboriosam quas mollitia
              voluptas inventore delectus quia voluptate excepturi, sint libero!
              Doloremque, cum nam!
            </p>
          </div>
        </div>
        <div className='article'>
          <div className='article--heading'>
            <h3 className='heading'>Article Title</h3>
            <span className='article--date'>11/11/11</span>
          </div>
          <div className='article--content'>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              assumenda, quibusdam facilis magni quam odit temporibus officia
              consequatur commodi quasi voluptatibus. Tenetur facilis minima
              quam repudiandae suscipit? Neque voluptatibus odit dolorum saepe
              dicta blanditiis perferendis beatae laboriosam quas mollitia
              voluptas inventore delectus quia voluptate excepturi, sint libero!
              Doloremque, cum nam!
            </p>
          </div>
        </div>
        <div className='article'>
          <div className='article--heading'>
            <h3 className='heading'>Article Title</h3>
            <span className='article--date'>11/11/11</span>
          </div>
          <div className='article--content'>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              assumenda, quibusdam facilis magni quam odit temporibus officia
              consequatur commodi quasi voluptatibus. Tenetur facilis minima
              quam repudiandae suscipit? Neque voluptatibus odit dolorum saepe
              dicta blanditiis perferendis beatae laboriosam quas mollitia
              voluptas inventore delectus quia voluptate excepturi, sint libero!
              Doloremque, cum nam!
            </p>
          </div>
        </div>
        <div className='article'>
          <div className='article--heading'>
            <h3 className='heading'>Article Title</h3>
            <span className='article--date'>11/11/11</span>
          </div>
          <div className='article--content'>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              assumenda, quibusdam facilis magni quam odit temporibus officia
              consequatur commodi quasi voluptatibus. Tenetur facilis minima
              quam repudiandae suscipit? Neque voluptatibus odit dolorum saepe
              dicta blanditiis perferendis beatae laboriosam quas mollitia
              voluptas inventore delectus quia voluptate excepturi, sint libero!
              Doloremque, cum nam!
            </p>
          </div>
        </div>
      </div>
    );
  }
}
