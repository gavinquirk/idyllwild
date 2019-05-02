import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
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
    error: null
  };

  onCreateEvent = (event, authUser) => {
    // Post form data to events array in DB
    this.props.firebase
      .events()
      .push({
        title: this.state.title,
        text: this.state.text,
        userId: authUser.uid,
        createdAt: this.props.firebase.serverValue.TIMESTAMP
      })
      .then(() => {
        // this.setState({ title: '' });
        // this.setState({ text: '' });
        this.props.history.push(ROUTES.ADMIN);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };
  onChangeTitle = event => {
    this.setState({ title: event.target.value });
  };

  render() {
    const { text, title } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className='AddEvent'>
            <div className='AddEvent-container'>
              <h1 className='heading heading-primary underline'>
                Add New Event
              </h1>
              <form onSubmit={event => this.onCreateEvent(event, authUser)}>
                <label className='heading'>Title</label>
                <input
                  type='text'
                  value={title}
                  onChange={this.onChangeTitle}
                />
                <label className='heading'>Text</label>
                <textarea
                  type='textarea'
                  value={text}
                  onChange={this.onChangeText}
                />
                <button type='submit'>Send</button>
              </form>
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
