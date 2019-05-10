import React, { Component } from 'react';
import { compose } from 'recompose';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from '../../components/Session';

import { withFirebase } from '../../components/Firebase';

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

const condition = authUser => !!authUser; // If authuser is not null

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(DashboardPage);
