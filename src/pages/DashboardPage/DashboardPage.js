import React, { Component } from 'react';
import { compose } from 'recompose';

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
          <div>
            <h1>Account: {authUser.email}</h1>
            {/* <PasswordForgetForm />
            <PasswordChangeForm /> */}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

// Condition for granting access -- if authUser is not null
const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(DashboardPage);
