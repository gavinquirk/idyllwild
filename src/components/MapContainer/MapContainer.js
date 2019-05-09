import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import './MapContainer.css';

const initialCoords = { lat: 33.6846, lng: -117.8265 }; // Irvine, California

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) => {
    console.log('onMarkerClick');
    console.log(props);
    console.log(marker);
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
    console.log('MapContainer rendering...');
    const { google, style, onReady, markerData, center } = this.props;

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
        // center={center}
        center={{ lat: markerData.lat, lng: markerData.lng }}
      >
        {/* If marker data props received, create marker */}
        {markerData ? (
          <Marker
            position={{ lat: markerData.lat, lng: markerData.lng }}
            name={'test location'}
            onClick={this.onMarkerClick}
          />
        ) : null}

        {/* {markerData ? ( */}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
        {/* ) : null} */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);
