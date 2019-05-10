import React, { Component } from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from '../../components/Session';

import './DashboardPage.css';

class DashboardPage extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className='Dashboard'>
            <h1>Welcome {authUser.username}</h1>
            <Link to='/pw-change'>Change your password</Link>
            {/* <PasswordForgetForm />
            <PasswordChangeForm /> */}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser; // If authuser is not null

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(DashboardPage);
