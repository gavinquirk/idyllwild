import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';

class MapSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    const google = this.props.google;
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput.current
      // Can specify types here as an argument
    );

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged() {
    // Retrieve address data and send props to parent component
    const place = this.autocomplete.getPlace();
    this.props.onPlaceLoaded(place);
  }

  render() {
    return (
      <input
        ref={this.autocompleteInput}
        id='autocomplete'
        placeholder='Search for a location'
        type='text'
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapSearchBar);
