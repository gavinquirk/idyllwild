import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Layout from './components/Layout/Layout';
import Navigation from './components/Navigation/Navigation';
import LandingPage from './pages/LandingPage/LandingPage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import PasswordForgetPage from './pages/PasswordForgetPage/PasswordForgetPage';
import PasswordChangePage from './components/PasswordChangePage/PasswordChangePage';
import SingleEvent from './components/SingleEvent/SingleEvent';
import SingleArticle from './components/SingleArticle/SingleArticle';
import EventsPage from './pages/EventsPage/EventsPage';
import ArticlesPage from './pages/ArticlesPage/ArticlesPage';

// Admin Components
import AdminPage from './pages/AdminPage/AdminPage';
// import AddArticle from './components/AdminAddArticle/AdminAddArticle';
// import AddEvent from './pages/AdminPage/AddEvent/AddEvent';
// TODO: Why must these components be imported? Not even correct paths?
import UserItem from './pages/AdminPage/AdminPage';
import UserList from './pages/AdminPage/AdminPage';

import * as ROUTES from './constants/routes';
import { withAuthentication } from './components/Session';

const App = () => (
  <div className='App'>
    <Layout>
      <Router>
        <Navigation />
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.PASSWORD_CHANGE} component={PasswordChangePage} />
        <Route path={ROUTES.DASHBOARD} component={DashboardPage} />
        <Route exact path={ROUTES.EVENTS} component={EventsPage} />
        <Route exact path={ROUTES.ARTICLES} component={ArticlesPage} />
        <Route path={ROUTES.SINGLE_EVENT} component={SingleEvent} />
        <Route path={ROUTES.SINGLE_ARTICLE} component={SingleArticle} />

        {/* Admin Routes */}
        {/* TODO: Why must these admin routes be declared in app.js and not only in admin page? */}
        <Route exact path={ROUTES.ADMIN} component={AdminPage} />

        <Route exact path={ROUTES.ADMIN_USER_LIST} component={UserList} />
        <Route exact path={ROUTES.ADMIN_USER_DETAILS} component={UserItem} />
        <Route exact path={ROUTES.ADMIN_ADD_USER} component={UserList} />

        <Route exact path={ROUTES.ADMIN_ARTICLE_LIST} component={UserList} />
        <Route exact path={ROUTES.ADMIN_ARTICLE_DETAILS} component={UserItem} />
        <Route exact path={ROUTES.ADMIN_ADD_ARTICLE} component={UserList} />

        <Route exact path={ROUTES.ADMIN_EVENT_LIST} component={UserList} />
        <Route exact path={ROUTES.ADMIN_EVENT_DETAILS} component={UserItem} />
        <Route exact path={ROUTES.ADMIN_ADD_EVENT} component={UserList} />
      </Router>
    </Layout>
  </div>
);

export default withAuthentication(App);
