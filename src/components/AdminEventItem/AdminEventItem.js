import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';

import { withFirebase } from '../Firebase';

import './AdminEventItem.css';

import MapSearchBar from '../MapSearchBar/MapSearchBar';
import MapContainer from '../MapContainer/MapContainer';

class AdminEventItem extends Component {
  state = {
    loading: false,
    event: null,
    editMode: false,
    editTitle: '',
    editText: '',
    editLocation: '',
    editTime: '',
    editDate: '',
    lat: null,
    lng: null,
    address: '',
    locationName: '',
    ...this.props.location.state
  };

  componentDidMount() {
    // If event state is passed, don't query for event
    // if (this.state.event) {
    //   return;
    // }

    this.setState({ loading: true });

    // Else, query db for article data
    this.props.firebase
      .event(this.props.match.params.id)
      .once('value', snapshot => {
        this.setState({
          event: snapshot.val(),
          lat: snapshot.val().lat,
          lng: snapshot.val().lng,
          address: snapshot.val().address,
          locationName: snapshot.val().locationName,
          loading: false
        });
      });
  }

  // Toggle edit mode
  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editTitle: this.state.event.title,
      editText: this.state.event.text,
      editTime: this.state.event.time,
      editDate: this.state.event.date
    }));
  };

  // Remove event from database
  onRemoveEvent = uid => {
    this.props.firebase
      .event(uid)
      .update({
        disabled: true
      })
      .then(() => this.props.history.push(ROUTES.ADMIN))
      .catch(error => console.log('error: ', error));
  };

  // Call edit event, exit edit mode
  onSaveEvent = () => {
    this.onEditEvent(
      this.state.event,
      this.state.editTitle,
      this.state.editText,
      this.state.editTime,
      this.state.editDate,
      this.state.lat,
      this.state.lng,
      this.state.address,
      this.state.locationName
    );
    this.setState({ editMode: false });
  };

  // Update Database
  onEditEvent = (
    event,
    title,
    text,
    time,
    date,
    lat,
    lng,
    address,
    locationName
  ) => {
    // Destructure and snapshot data
    const { ...eventSnapshot } = event;

    const updatedEvent = {
      ...eventSnapshot,
      title,
      text,
      time,
      date,
      lat,
      lng,
      address,
      locationName,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    };

    console.log(updatedEvent);

    this.props.firebase
      .event(event.uid)
      .set(updatedEvent)
      .then(
        this.setState({
          event: updatedEvent,
          title,
          text,
          time,
          date,
          lat,
          lng,
          address,
          locationName
        }),
        console.log('Successfully Updated')
      )
      .catch(error => console.log('error: ', error));
  };

  // Handle text/state changes from forms
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Handle map loaded
  onPlaceLoaded = place => {
    // Set state with new map data
    this.setState({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      address: place.formatted_address,
      locationName: place.name
    });

    console.log(this.state);
  };

  render() {
    const {
      event,
      loading,
      editTitle,
      editText,
      editTime,
      editDate,
      editMode,
      lat,
      lng,
      locationName,
      address
    } = this.state;

    console.log(event.uid);

    return (
      <div className='AdminEventItem'>
        <h1 className='heading'>Event: {event.title}</h1>
        {loading && <div>Loading ...</div>}

        {event && !loading && (
          <div className='list'>
            <span>
              <strong>Event ID:</strong> {event.uid}
            </span>
            <span>
              <strong>Owner:</strong> {event.userId}
            </span>

            {/* Conditional Rendering */}
            {/* Inputs */}
            {editMode ? (
              <>
                <label>Title</label>
                <input
                  name='editTitle'
                  type='text'
                  value={editTitle}
                  onChange={this.onChange}
                />
                <label>Text</label>
                <input
                  name='editText'
                  type='text'
                  value={editText}
                  onChange={this.onChange}
                />
                <label>Time</label>
                <input
                  name='editTime'
                  type='time'
                  value={editTime}
                  onChange={this.onChange}
                />
                <label>Date</label>
                <input
                  name='editDate'
                  type='date'
                  value={editDate}
                  onChange={this.onChange}
                />
                <label>Location</label>
                <MapSearchBar onPlaceLoaded={this.onPlaceLoaded} />
              </>
            ) : (
              <>
                <span>
                  <strong>Title:</strong> {event.title}
                </span>
                <span>
                  <strong>Text:</strong> {event.text}
                </span>
                <span>
                  <strong>Time:</strong> {event.time}
                </span>
                <span>
                  <strong>Date:</strong> {event.date}
                </span>
                <span>
                  <strong>Location:</strong> {event.address}
                </span>
              </>
            )}
            {/* <MapContainer
              style={{
                height: '500px',
                position: 'relative',
                marginTop: '20px'
              }}
              markerData={{
                lat: lat,
                lng: lng,
                address: address,
                locationName: locationName
              }}
              initialCoords={{
                lat: event.lat,
                lng: event.lng
              }}
            /> */}

            <div className='event-buttons'>
              {/* Buttons */}
              {/* Edit Mode */}
              {editMode ? (
                <span>
                  <button className='save-button' onClick={this.onSaveEvent}>
                    Save
                  </button>
                  <button onClick={this.onToggleEditMode}>Cancel</button>
                </span>
              ) : (
                // Not edit mode
                <button onClick={this.onToggleEditMode}>Edit</button>
              )}

              <button
                className='delete-button'
                type='button'
                onClick={() => this.onRemoveEvent(event.uid)}
              >
                Delete Event
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(AdminEventItem);
