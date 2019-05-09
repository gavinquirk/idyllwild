import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    const { coords } = this.props;
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={{ width: '100%', height: '100%', position: 'relative' }}
        initialCenter={{
          lat: coords.lat,
          lng: coords.lng
        }}
      >
        <Marker
          position={{ lat: coords.lat, lng: coords.lng }}
          name={'test location'}
        />

        {/* <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);
