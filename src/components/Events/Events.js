import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

import './Events.css';

// style={this.props.expandState ? { width: '80%' } : { width: '20%' }}

class EventsBase extends Component {
  state = {
    events: [],
    loading: false
  };

  componentDidMount() {
    this.onListenForEvents();
  }

  formatTime = timestamp => {
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const formattedDate = new Date(timestamp);
    return formattedDate.toLocaleDateString('en-US', options);
  };

  onListenForEvents() {
    this.setState({ loading: true });
    this.props.firebase
      .events()
      .orderByChild('createdAt')
      // .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const eventObject = snapshot.val();

        if (eventObject) {
          // Convert eventObject into array
          const eventList = Object.keys(eventObject)
            .map(key => ({
              ...eventObject[key],
              uid: key
            }))
            .reverse();
          this.setState({
            events: eventList,
            loading: false
          });
        } else {
          this.setState({ events: null, loading: false });
        }
      });
  }

  render() {
    // Destructure events from state
    const { events } = this.state;

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
        {/* Events Section */}

        {events.length >= 1 ? (
          events.map(event => (
            <div key={event.uid} className='event'>
              <div className='event--heading'>
                <h3 className='heading'>{event.title}</h3>
                <span className='event--date'>
                  {this.formatTime(event.createdAt)}
                </span>
              </div>
              <div className='event--content'>
                <p>{event.text}</p>
              </div>
            </div>
          ))
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}

const Events = withFirebase(EventsBase);

export default Events;
