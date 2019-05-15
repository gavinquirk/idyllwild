import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import {
  withAuthorization,
  withEmailVerification
} from '../../components/Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import './AdminPage.css';

import AdminSideBar from '../../components/AdminSideBar/AdminSideBar';
import AdminUserList from '../../components/AdminUserList/AdminUserList';
import AdminUserItem from '../../components/AdminUserItem/AdminUserItem';
import AdminAddArticle from '../../components/AdminAddArticle/AdminAddArticle';
import AdminAddEvent from '../../components/AdminAddEvent/AdminAddEvent';

const AdminPage = () => (
  <div className='AdminPage'>
    <AdminSideBar />
    <div className='admin-content'>
      <h1>Admin</h1>
      <p>The Admin Page is accessible by every signed in admin user.</p>
      <Switch>
        {/* User Routes */}
        <Route
          exact
          path={ROUTES.ADMIN_USER_DETAILS}
          component={AdminUserItem}
        />
        <Route exact path={ROUTES.ADMIN_USER_LIST} component={AdminUserList} />
        {/* Article Routes */}
        <Route
          exact
          path={ROUTES.ADMIN_ADD_ARTICLE}
          component={AdminAddArticle}
        />
        {/* Event Routes */}
        <Route exact path={ROUTES.ADMIN_ADD_EVENT} component={AdminAddEvent} />
      </Switch>
    </div>
  </div>
);

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN]; // If user is authenticated, and admin role is not null

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AdminPage);
