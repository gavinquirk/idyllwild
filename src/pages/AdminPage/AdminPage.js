import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../../components/Firebase';
import {
  withAuthorization,
  withEmailVerification
} from '../../components/Session';
import * as ROLES from '../../constants/roles';

class AdminPage extends Component {
  state = {
    loading: false,
    users: []
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      // Convert users object into array
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>

        {loading && <div>Loading ...</div>}

        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN]; // If user is authenticated, and admin role is not null

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(AdminPage);
