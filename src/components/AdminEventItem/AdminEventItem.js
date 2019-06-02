import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';

import { withFirebase } from '../Firebase';

import './AdminEventItem.css';

class AdminEventItem extends Component {
  state = {
    loading: false,
    event: null,
    ...this.props.location.state
  };

  componentDidMount() {
    // If event state is passed, don't query for event
    if (this.state.event) {
      return;
    }

    this.setState({ loading: true });

    // Else, query db for article data
    this.props.firebase
      .event(this.props.match.params.id)
      .once('value', snapshot => {
        this.setState({
          event: snapshot.val(),
          loading: false
        });
      });
  }

  // onEditEventDetails = () => {
  //   console.log('Edit Event Details clicked...');
  // };

  // onDeleteEvent = () => {
  //   console.log('Delete Event clicked...');
  // };

  // Remove article from database
  onRemoveEvent = uid => {
    this.props.firebase
      .event(uid)
      .update({
        disabled: true
      })
      .then(() => this.props.history.push(ROUTES.ADMIN))
      .catch(error => console.log('error: ', error));
  };

  render() {
    const { event, loading } = this.state;

    return (
      <div className='AdminEventItem'>
        <h1 className='heading'>Event: {event.title}</h1>
        {loading && <div>Loading ...</div>}

        {event && (
          <div className='list'>
            <span>
              <strong>Event ID:</strong> {event.uid}
            </span>
            <span>
              <strong>Title:</strong> {event.title}
            </span>
            <span>
              <strong>Owner:</strong> {event.userId}
            </span>
            <span>
              <strong>Text:</strong> {event.text}
            </span>

            <div className='event-buttons'>
              <button type='button' onClick={this.onEditEventDetails}>
                Edit Event
              </button>
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
