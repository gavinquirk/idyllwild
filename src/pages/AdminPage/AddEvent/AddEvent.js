import React, { Component } from 'react';
import { compose } from 'recompose';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import MapSearchBar from '../../../components/MapSearchBar/MapSearchBar';
import { withFirebase } from '../../../components/Firebase';
import {
  withAuthorization,
  withEmailVerification,
  AuthUserContext
} from '../../../components/Session';

import * as ROLES from '../../../constants/roles';
import * as ROUTES from '../../../constants/routes';

import './AddEvent.css';

class AddEventBase extends Component {
  state = {
    text: '',
    title: '',
    lat: null,
    lng: null,
    error: null
  };

  onCreateEvent = (event, authUser) => {
    // Post form data to events array in DB
    this.props.firebase
      .events()
      .push({
        title: this.state.title,
        text: this.state.text,
        lat: this.state.lat,
        lng: this.state.lng,
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
    console.log(place);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { text, title, lat, lng } = this.state;
    const initialCoords = { lat: 33.6846, lng: -117.8265 }; // Irvine, California

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
                <input
                  name='title'
                  type='text'
                  value={title}
                  onChange={this.onChange}
                />
                {/* Text */}
                <label className='heading'>Text</label>
                <textarea
                  name='text'
                  type='textarea'
                  value={text}
                  onChange={this.onChange}
                />
                {/* Location */}
                <label className='heading'>Location (coordinates)</label>
                <input
                  name='lat'
                  type='text'
                  value={lat}
                  onChange={this.onChange}
                  placeholder='Lattitude'
                />
                <input
                  name='lng'
                  type='text'
                  value={lng}
                  onChange={this.onChange}
                  placeholder='Longitude'
                />
                <MapSearchBar onPlaceLoaded={this.onPlaceLoaded} />
                <button type='submit'>Send</button>
              </form>
              {/* <Map
                google={this.props.google}
                zoom={14}
                style={{ width: '100%', height: '100%', position: 'relative' }}
                onReady={props =>
                  this.placesInit(props, this.autocompleteInput)
                }
                initialCenter={{
                  lat: initialCoords.lat,
                  lng: initialCoords.lng
                }}
              >
                <Marker
                  position={{ lat: initialCoords.lat, lng: initialCoords.lng }}
                  name={'test location'}
                />
              </Map> */}
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const AddEvent = withFirebase(AddEventBase);

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN]; // If user is authenticated, and admin role is not null

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AddEvent);
