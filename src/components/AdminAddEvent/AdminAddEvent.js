import React, { Component } from 'react';
import { compose } from 'recompose';
import moment from 'moment';

import MapSearchBar from '../MapSearchBar/MapSearchBar';
import MapContainer from '../MapContainer/MapContainer';
import { withFirebase } from '../Firebase';
import {
  withAuthorization,
  withEmailVerification,
  AuthUserContext
} from '../Session';

import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import './AdminAddEvent.css';

class AdminAddEventBase extends Component {
  state = {
    text: '',
    title: '',
    lat: null,
    lng: null,
    address: '',
    date: '',
    time: '',
    locationName: '',
    error: null
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.lat !== nextState.lat || this.state.lng !== nextState.lng) {
      return true;
    } else {
      return false;
    }
  }

  onCreateEvent = (event, authUser) => {
    // Convert date format
    const formattedDate = moment(this.state.date, 'YYYY - MM - DD').format(
      'dddd, MMMM Do, YYYY'
    );
    // Post form data to events array in DB
    this.props.firebase
      .events()
      .push({
        title: this.state.title,
        text: this.state.text,
        lat: this.state.lat,
        lng: this.state.lng,
        date: formattedDate,
        time: this.state.time,
        address: this.state.address,
        locationName: this.state.locationName,
        userId: authUser.uid,
        createdAt: this.props.firebase.serverValue.TIMESTAMP
      })
      .then(() => {
        this.props.history.push(ROUTES.ADMIN);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onPlaceLoaded = place => {
    // Set state with new map data
    console.log('test', place);
    this.setState({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      address: place.formatted_address,
      locationName: place.name
    });
    console.log(this.state);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const initialCoords = { lat: 33.6846, lng: -117.8265 };

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className='AddEvent'>
            <div className='AddEvent-container'>
              <h1 className='heading heading-primary underline'>
                Add New Event
              </h1>
              <form onSubmit={event => this.onCreateEvent(event, authUser)}>
                {/* Title */}
                <label className='heading'>Title</label>
                <input name='title' type='text' onChange={this.onChange} />
                {/* Text */}
                <label className='heading'>Text</label>
                <textarea
                  name='text'
                  type='textarea'
                  onChange={this.onChange}
                />
                {/* Date */}
                <label className='heading'>Date (mm/dd/yy)</label>
                <input name='date' type='date' onChange={this.onChange} />
                {/* Time */}
                <label className='heading'>Time (0:00 AM/PM)</label>
                <input name='time' type='time' onChange={this.onChange} />
                {/* Autocomplete search and map */}
                <label className='heading'>Location</label>
                <MapSearchBar onPlaceLoaded={this.onPlaceLoaded} />
                <MapContainer
                  style={{
                    height: '500px',
                    position: 'relative',
                    marginTop: '20px'
                  }}
                  markerData={{
                    lat: this.state.lat,
                    lng: this.state.lng,
                    address: this.state.address,
                    locationName: this.state.locationName
                  }}
                  initialCoords={{
                    lat: initialCoords.lat,
                    lng: initialCoords.lng
                  }}
                />
                <button type='submit'>Submit Event</button>
              </form>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const AdminAddEvent = withFirebase(AdminAddEventBase);

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN]; // If user is authenticated, and admin role is not null

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AdminAddEvent);
