import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    const { google, style, onReady, markerData } = this.props;
    console.log(this.props);
    return (
      <Map
        google={google}
        zoom={14}
        style={style}
        onReady={onReady}
        center={{ lat: markerData.lat, lng: markerData.lng }}
      >
        {/* If marker data props received, create marker */}
        {markerData ? (
          <Marker
            position={{ lat: markerData.lat, lng: markerData.lng }}
            name={'test location'}
          />
        ) : null}

        {markerData ? (
          <InfoWindow
            onClose={this.onInfoWindowClose}
            position={{ lat: markerData.lat, lng: markerData.lng }}
          >
            <div>
              <h1>test</h1>
            </div>
          </InfoWindow>
        ) : null}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);
