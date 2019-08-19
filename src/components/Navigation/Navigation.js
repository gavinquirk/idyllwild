import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut/SignOutButton';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import './Navigation.css';

const Navigation = () => (
  <div className='Navigation'>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ({ authUser }) => (
  <ul className='NavigationList'>
    <li>
      <Link className='hover' to={ROUTES.LANDING}>
        Home
      </Link>
    </li>
    <li>
      <Link className='hover' to={ROUTES.ARTICLES}>
        News
      </Link>
    </li>
    <li>
      <Link className='hover' to={ROUTES.EVENTS}>
        Shows
      </Link>
    </li>
    <li>
      <Link className='hover' to={ROUTES.DASHBOARD}>
        Dashboard
      </Link>
    </li>
    {!!authUser.roles[ROLES.ADMIN] && (
      <li>
        <Link className='hover' to={ROUTES.ADMIN}>
          Admin
        </Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul className='NavigationList'>
    <li>
      <Link to={ROUTES.LANDING} className='hover'>
        Home
      </Link>
    </li>
    <li>
      <Link className='hover' to={ROUTES.ARTICLES}>
        News
      </Link>
    </li>
    <li>
      <Link className='hover' to={ROUTES.EVENTS}>
        Shows
      </Link>
    </li>

    {/* <li>
      <Link to={ROUTES.SIGN_IN} className='hover'>
        Sign In
      </Link>
    </li> */}
  </ul>
);

export default Navigation;
