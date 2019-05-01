import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../components/Firebase';
import * as ROUTES from '../../constants/routes';

import './PasswordForgetPage.css';

const PasswordForgetPage = () => (
  <div className='PasswordForgetPage'>
    <div className='PasswordForgetPage-container'>
      <h1 className='heading heading-primary underline'>
        Forgot Your Password?
      </h1>
      <p>Enter your email to reset your password</p>
      <PasswordForgetForm />
    </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name='email'
          value={this.state.email}
          onChange={this.onChange}
          type='text'
          placeholder='Email Address'
        />
        <button disabled={isInvalid} type='submit'>
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <button className='PasswordForgetLink'>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </button>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
