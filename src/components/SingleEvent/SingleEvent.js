import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

import MapContainer from '../MapContainer/MapContainer';
import './SingleEvent.css';

// TODO: EXTRA RENDERING HAPPENING ON THIS PAGE

class SingleEventBase extends Component {
  state = {
    event: null,
    loading: false
  };
  componentDidMount() {
    // If event state is passed, don't query for user
    if (this.state.event) {
      return;
    }

    this.setState({ loading: true });

    // Else, query db for event data
    this.props.firebase
      .event(this.props.match.params.id)
      .once('value', snapshot => {
        this.setState({
          event: snapshot.val(),
          loading: false
        });
      });
  }

  render() {
    const { event, loading } = this.state;
    return (
      <div className='SingleEvent'>
        {loading && <div>Loading ...</div>}
        {event && (
          <>
            <h1 className='underline'>{event.title}</h1>
            <p id='about'>{event.text}</p>

            <p>
              <span className='line-header'>Date: </span>
              {event.date}
            </p>
            <p>
              <span className='line-header'>Time: </span>
              {event.time}
            </p>
            <p>
              <span className='line-header'>Address: </span>
              {event.address}
            </p>
            <MapContainer
              style={{
                height: '500px',
                position: 'relative',
                marginTop: '20px'
              }}
              markerData={{
                lat: event.lat,
                lng: event.lng,
                address: event.address,
                locationName: event.locationName
              }}
              initialCoords={{
                lat: event.lat,
                lng: event.lng
              }}
            />
          </>
        )}
      </div>
    );
  }
}

const SingleEvent = withFirebase(SingleEventBase);

export default SingleEvent;
