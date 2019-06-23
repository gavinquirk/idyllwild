import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';

import { withFirebase } from '../Firebase';

import './AdminEventItem.css';

class AdminEventItem extends Component {
  state = {
    loading: false,
    event: null,
    editMode: false,
    editTitle: '',
    editText: '',
    editLocation: '',
    editTime: '',
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
          loading: false
        });
      });
  }

  // Toggle edit mode
  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editTitle: this.state.event.title,
      editText: this.state.event.text
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

  onSaveEvent = () => {
    this.onEditEvent(
      this.state.event,
      this.state.editTitle,
      this.state.editText
    );
    this.setState({ editMode: false });
  };

  onEditEvent = (event, title, text) => {
    console.log(title);
    console.log(text);
    // Destructure and snapshot data
    const { ...eventSnapshot } = event;

    const updatedEvent = {
      ...eventSnapshot,
      title,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    };

    this.props.firebase
      .event(event.uid)
      .set(updatedEvent)
      .then(
        this.setState({ event: updatedEvent }),
        console.log('Successfully Updated')
      )
      .catch(error => console.log('error: ', error));
  };

  onChangeEditTitle = event => {
    this.setState({ editTitle: event.target.value });
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  render() {
    const { event, loading, editTitle, editText, editMode } = this.state;

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
              <strong>Owner:</strong> {event.userId}
            </span>

            {/* Conditional Rendering */}
            {/* Inputs */}
            {editMode ? (
              <>
                <input
                  type='text'
                  value={editTitle}
                  onChange={this.onChangeEditTitle}
                />
                <input
                  type='text'
                  value={editText}
                  onChange={this.onChangeEditText}
                />
              </>
            ) : (
              <>
                <span>
                  <strong>Title:</strong> {event.title}
                </span>
                <span>
                  <strong>Text:</strong> {event.text}
                </span>
              </>
            )}

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
