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

import AdminAddUser from '../../components/AdminAddUser/AdminAddUser';
import AdminUserList from '../../components/AdminUserList/AdminUserList';
import AdminUserItem from '../../components/AdminUserItem/AdminUserItem';

import AdminAddArticle from '../../components/AdminAddArticle/AdminAddArticle';
import AdminArticleList from '../../components/AdminArticleList/AdminArticleList';
import AdminArticleItem from '../../components/AdminArticleItem/AdminArticleItem';

import AdminEventList from '../../components/AdminEventList/AdminEventList';
import AdminEventItem from '../../components/AdminEventItem/AdminEventItem';
import AdminAddEvent from '../../components/AdminAddEvent/AdminAddEvent';

// TEST FOR GITHUB BRANCH PROTECTION

const AdminPage = () => (
  <div className='AdminPage'>
    <AdminSideBar />
    <div className='admin-content'>
      <Switch>
        <Route exact path={ROUTES.ADMIN} component={AdminHome} />
        {/* User Routes */}
        <Route exact path={ROUTES.ADMIN_USER_LIST} component={AdminUserList} />
        <Route
          exact
          path={ROUTES.ADMIN_USER_DETAILS}
          component={AdminUserItem}
        />
        <Route exact path={ROUTES.ADMIN_ADD_USER} component={AdminAddUser} />
        {/* Article Routes */}
        <Route
          exact
          path={ROUTES.ADMIN_ARTICLE_LIST}
          component={AdminArticleList}
        />
        <Route
          exact
          path={ROUTES.ADMIN_ARTICLE_DETAILS}
          component={AdminArticleItem}
        />
        <Route
          exact
          path={ROUTES.ADMIN_ADD_ARTICLE}
          component={AdminAddArticle}
        />
        {/* Event Routes */}
        <Route
          exact
          path={ROUTES.ADMIN_EVENT_LIST}
          component={AdminEventList}
        />
        <Route
          exact
          path={ROUTES.ADMIN_EVENT_DETAILS}
          component={AdminEventItem}
        />
        <Route exact path={ROUTES.ADMIN_ADD_EVENT} component={AdminAddEvent} />
      </Switch>
    </div>
  </div>
);

const AdminHome = () => {
  return (
    <div className='AdminHome'>
      <h1 className='heading'>Welcome to the Admin Page</h1>
      <p>
        Here you can manage your users, articles, and events. Click on any of
        the links in the toolbar.
      </p>
    </div>
  );
};

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN]; // If user is authenticated, and admin role is not null

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AdminPage);
