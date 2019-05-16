import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../components/Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import './AdminAddUser.css';

const AdminAddUser = () => (
  <div className='AdminAddUser'>
    <div className='AdminAddUser-container'>
      <h1 className='heading heading-primary underline'>Add User</h1>
      <AddUserForm />
    </div>
  </div>
);

// Initial state to be used for reset
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null
};

class AddUserFormBase extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;

    const roles = {};
    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.ADMIN);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name='username'
          value={username}
          onChange={this.onChange}
          type='text'
          placeholder='Full Name'
        />
        <input
          name='email'
          value={email}
          onChange={this.onChange}
          type='text'
          placeholder='Email Address'
        />
        <input
          name='passwordOne'
          value={passwordOne}
          onChange={this.onChange}
          type='password'
          placeholder='Password'
        />
        <input
          name='passwordTwo'
          value={passwordTwo}
          onChange={this.onChange}
          type='password'
          placeholder='Confirm Password'
        />
        <div className='admin-checkbox'>
          <label>Make User Admin:</label>
          <input
            name='isAdmin'
            type='checkbox'
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </div>
        <button disabled={isInvalid} type='submit'>
          Add User
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const AddUserForm = compose(
  withRouter,
  withFirebase
)(AddUserFormBase);

export default AdminAddUser;
