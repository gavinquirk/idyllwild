import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Layout from './components/Layout/Layout';
import Navigation from './components/Navigation/Navigation';
import LandingPage from './pages/LandingPage/LandingPage';
import AdminPage from './pages/AdminPage/AdminPage';
import AddArticle from './pages/AdminPage/AddArticle/AddArticle';
import AddEvent from './pages/AdminPage/AddEvent/AddEvent';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import PasswordForgetPage from './pages/PasswordForgetPage/PasswordForgetPage';

import * as ROUTES from './constants/routes';
import { withAuthentication } from './components/Session';

const App = () => (
  <div className='App'>
    <Layout>
      <Router>
        <Navigation />
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route exact path={ROUTES.ADMIN_ADD_ARTICLE} component={AddArticle} />
        <Route exact path={ROUTES.ADMIN_ADD_EVENT} component={AddEvent} />
        <Route exact path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.DASHBOARD} component={DashboardPage} />
      </Router>
    </Layout>
  </div>
);

export default withAuthentication(App);
