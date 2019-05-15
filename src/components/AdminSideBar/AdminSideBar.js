import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import './AdminSideBar.css';

class AdminSideBar extends Component {
  render() {
    return (
      <div className='AdminSideBar'>
        <h1>Toolbar</h1>
        <ul>
          <h4>Users</h4>
          <li>Add a User</li>
          <li>Manage Users</li>
          <h4>Articles</h4>
          <li>
            <Link to={ROUTES.ADMIN_ADD_ARTICLE}>Add Article</Link>
          </li>
          <li>Manage Articles</li>
          <h4>Events</h4>
          <li>
            <Link to={ROUTES.ADMIN_ADD_EVENT}>Add Event</Link>
          </li>
          <li>Manage Events</li>
        </ul>
      </div>
    );
  }
}

export default AdminSideBar;
