import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import './AdminSideBar.css';

class AdminSideBar extends Component {
  render() {
    return (
      <div className='AdminSideBar'>
        <h1 className='heading'>Tools</h1>
        <ul className='AdminSideBarList'>
          <li>
            <h4>Users</h4>
          </li>
          <li>
            <Link to={ROUTES.ADMIN_ADD_USER}>Add User</Link>
          </li>
          <li>
            <Link to={ROUTES.ADMIN_USER_LIST}>Manage Users</Link>
          </li>
          <li>
            <h4>Articles</h4>
          </li>
          <li>
            <Link to={ROUTES.ADMIN_ADD_ARTICLE}>Add Article</Link>
          </li>
          <li>
            <Link to={ROUTES.ADMIN_ARTICLE_LIST}>Manage Articles</Link>
          </li>
          <li>
            <h4>Events</h4>
          </li>
          <li>
            <Link to={ROUTES.ADMIN_ADD_EVENT}>Add Event</Link>
          </li>
          <li>
            <Link to={ROUTES.ADMIN_EVENT_LIST}>Manage Events</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default AdminSideBar;
