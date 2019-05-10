import React from 'react';

import './SignOutButton.css';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button className='SignOutButton' type='button' onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
