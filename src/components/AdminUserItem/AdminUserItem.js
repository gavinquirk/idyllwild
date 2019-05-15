import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

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

  render() {
    const { user, loading } = this.state;

    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {user && (
          <div>
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Username:</strong> {user.username}
            </span>
            <span>
              <button type='button' onClick={this.onSendPasswordResetEmail}>
                Send Password Reset
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(AdminUserItem);
