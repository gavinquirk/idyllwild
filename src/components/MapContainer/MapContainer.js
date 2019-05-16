import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import './MapContainer.css';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const { google, style, onReady, markerData, initialCoords } = this.props;

    // If no marker data, center on initialCoords
    if (markerData.lat === null) {
      markerData.lat = initialCoords.lat;
      markerData.lng = initialCoords.lng;
    }
    return (
      <Map
        className='MapContainer'
        google={google}
        zoom={14}
        style={style}
        onReady={onReady}
        initialCenter={{ lat: initialCoords.lat, lng: initialCoords.lng }}
        center={{ lat: markerData.lat, lng: markerData.lng }}
      >
        {/* If marker data props received, create marker */}
        {markerData ? (
          <Marker
            position={{ lat: markerData.lat, lng: markerData.lng }}
            name={markerData.locationName}
            address={markerData.address}
            onClick={this.onMarkerClick}
          />
        ) : null}

        {markerData ? (
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div style={{ color: '#000' }}>
              <h1>{this.state.selectedPlace.name}</h1>
              <span>{this.state.selectedPlace.address}</span>
            </div>
          </InfoWindow>
        ) : (
          'null'
        )}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);
