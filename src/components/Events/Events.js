import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import './Events.css';

class EventsBase extends Component {
  state = {
    events: [],
    loading: false,
    limit: 5
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
    // Listen for event data
    this.props.firebase
      .events()
      .orderByChild('disabled') // Filter for articles which are not disabled
      .equalTo(false || null)
      // .orderByChild('createdAt')
      .limitToFirst(this.state.limit)
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
          // Send event data to state
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
        // style={this.props.expandState ? { width: '50%' } : { width: '50%' }}
      >
        <span className='heading-span underline'>
          <Link
            to={{
              pathname: `/events`,
              state: { events } // Pass event data
            }}
            className='hover'
          >
            <h1 className='heading heading-primary'>Upcoming Shows</h1>
          </Link>
        </span>
        {/* Events Section */}

        {events.length >= 1 ? (
          events.map(event => (
            <div key={event.uid} className='event'>
              <div className='event--heading'>
                <Link
                  to={{
                    pathname: `/events/${event.uid}`,
                    state: { event } // Pass event data to details component
                  }}
                  className='hover'
                >
                  <h2 className='heading'>{event.title}</h2>
                </Link>
              </div>

              <div className='event--content'>
                <p className='event--location'>
                  Location: {event.locationName}
                </p>
                <p className='event--date'>
                  Date: {event.date} at {event.time}
                </p>
                <p className='event--text'>{event.text}</p>
                <p className='event--more-details'>
                  <Link
                    to={{
                      pathname: `/events/${event.uid}`,
                      state: { event } // Pass event data to details component
                    }}
                    className='hover'
                  >
                    More details...
                  </Link>
                </p>
                <p className='posted-date'>
                  Posted: {this.formatTime(event.createdAt)}
                </p>
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
