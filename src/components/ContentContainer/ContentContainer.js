import React, { Component } from 'react';
import './ContentContainer.css';

import NewsFeed from '../NewsFeed/NewsFeed';
import Events from '../Events/Events';

export default class ContentContainer extends Component {
  state = {
    expandEvents: false
  };

  expandEventsHandler = () => {
    this.setState({ expandEvents: !this.state.expandEvents });
  };

  render() {
    return (
      <div className='ContentContainer'>
        <NewsFeed
          expandEventsHandler={this.expandEventsHandler}
          expandState={this.state.expandEvents}
        />
        <Events
          expandEventsHandler={this.expandEventsHandler}
          expandState={this.state.expandEvents}
        />
      </div>
    );
  }
}
