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
      .on('value', snapshot => {
        this.setState({
          event: snapshot.val(),
          loading: false
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  render() {
    const { event, loading } = this.state;
    console.log(event);
    return (
      <div className='SingleEvent'>
        {loading && <div>Loading ...</div>}
        {event && (
          <>
            <h1>{event.title}</h1>
            <p>{event.text}</p>
            <div className='map'>
              <MapContainer coords={{ lat: event.lat, lng: event.lng }} />
            </div>
          </>
        )}
      </div>
    );
  }
}

const SingleEvent = withFirebase(SingleEventBase);

export default SingleEvent;
