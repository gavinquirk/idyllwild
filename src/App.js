import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage/LandingPage';
import AdminPage from './pages/AdminPage/AdminPage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import PasswordForgetPage from './pages/PasswordForgetPage';

import * as ROUTES from './constants/routes';

function App() {
  return (
    <div className='App'>
      <Router>
        <Layout>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.DASHBOARD} component={DashboardPage} />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
