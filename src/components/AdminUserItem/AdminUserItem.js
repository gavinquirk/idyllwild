import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

import './AdminUserItem.css';

class AdminUserItem extends Component {
  state = {
    loading: false,
    user: null,
    editMode: false,
    editUsername: '',
    ...this.props.location.state
  };

  componentDidMount() {
    console.log('USER ITEM MOUNTED');
    // If user state is passed, don't query for user
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    // Else, query db for user data
    this.props.firebase
      .user(this.props.match.params.id)
      .once('value', snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false
        });
      });
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
  };

  // State update for forms
  onChangeEditUsername = event => {
    this.setState({ editUsername: event.target.value });
  };

  // Toggle edit mode, set edit state to user state
  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editUsername: this.state.user.username
    }));
  };

  onSaveUser = () => {
    // Call onEditUser with edit state as args, set edit mode to false
    this.onEditUser(this.state.user, this.state.editUsername);
    this.setState({ editMode: false });
  };

  onEditUser = (user, username) => {
    // Destructure uid and snapshot data
    const { ...userSnapshot } = user;

    const updatedUser = {
      ...userSnapshot,
      username,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    };

    // Update user with new data, add editedAt timestamp, update state
    this.props.firebase
      .user(user.uid)
      .set(updatedUser)
      .then(
        this.setState({ user: updatedUser }),
        console.log('Successfully Updated')
      )
      .catch(error => console.log('error: ', error));
  };

  // Set user to disabled
  onRemoveUser = uid => {
    this.props.firebase
      .user(uid)
      .update({
        disabled: true
      })
      .then(() => console.log('Successfully Disabled'))
      .catch(error => console.log('error: ', error));
  };

  render() {
    const { user, loading, editMode, editUsername } = this.state;

    return (
      <div className='AdminUserItem'>
        <h1 className='heading'>User: {user.username}</h1>
        {loading && <div>Loading ...</div>}

        {user && (
          <div className='list'>
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>

            {/* Edit mode conditional rendering */}
            {editMode ? (
              <input
                type='text'
                value={editUsername}
                onChange={this.onChangeEditUsername}
              />
            ) : (
              <span>
                <strong>Username:</strong> {user.username}
              </span>
            )}

            <div className='user-buttons'>
              {editMode ? (
                <span>
                  <button onClick={this.onSaveUser}>Save</button>
                  <button onClick={this.onToggleEditMode}>Reset</button>
                </span>
              ) : (
                <>
                  <button onClick={this.onToggleEditMode}>Edit</button>
                  <button type='button' onClick={this.onSendPasswordResetEmail}>
                    Send Password Reset
                  </button>
                </>
              )}

              <button
                className='delete-button'
                type='button'
                onClick={() => this.onRemoveUser(user.uid)}
              >
                Delete User
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(AdminUserItem);
