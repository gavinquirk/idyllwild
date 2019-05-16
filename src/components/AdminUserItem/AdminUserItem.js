import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

import './AdminUserItem.css';

class AdminUserItem extends Component {
  state = {
    loading: false,
    user: null,
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
      .on('value', snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
  };

  onEditUserDetails = () => {
    console.log('Edit User Details clicked...');
  };

  onDeleteUser = () => {
    console.log('Delete User clicked...');
  };

  render() {
    const { user, loading } = this.state;

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
            <span>
              <strong>Username:</strong> {user.username}
            </span>
            <div className='user-buttons'>
              <button type='button' onClick={this.onSendPasswordResetEmail}>
                Send Password Reset
              </button>
              <button type='button' onClick={this.onEditUserDetails}>
                Edit User Details
              </button>
              <button
                className='delete-button'
                type='button'
                onClick={this.onDeleteUser}
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
