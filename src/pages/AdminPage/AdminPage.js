import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../components/Firebase';
import {
  withAuthorization,
  withEmailVerification
} from '../../components/Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import './AdminPage.css';

import AdminSideBar from '../../components/AdminSideBar/AdminSideBar';
import AdminAddEvent from '../../pages/AdminPage/AddEvent/AddEvent';

const AdminPage = () => (
  <div className='AdminPage'>
    <AdminSideBar />
    <div className='admin-content'>
      <h1>Admin</h1>
      <p>The Admin Page is accessible by every signed in admin user.</p>
      <Switch>
        {/* <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
        <Route exact path={ROUTES.ADMIN} component={UserList} /> */}
        {/* <Route exact path={ROUTES.ADMIN_ADD_EVENT} component={AdminAddEvent} /> */}
      </Switch>
    </div>
  </div>
);

class UserListBase extends Component {
  state = {
    loading: false,
    users: []
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
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
        <h2>Users</h2>
        {loading && <div>Loading ...</div>}
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
              <span>
                <Link
                  to={{
                    pathname: `${ROUTES.ADMIN}/${user.uid}`,
                    state: { user } // Pass user data to details component
                  }}
                >
                  Details
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class UserItemBase extends Component {
  state = {
    loading: false,
    user: null,
    ...this.props.location.state
  };

  componentDidMount() {
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

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN]; // If user is authenticated, and admin role is not null

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AdminPage);
