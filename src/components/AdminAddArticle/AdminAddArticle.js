import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import {
  withAuthorization,
  withEmailVerification,
  AuthUserContext
} from '../Session';

import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import './AdminAddArticle.css';

class AdminAddArticleBase extends Component {
  state = {
    text: '',
    title: '',
    error: null
  };

  componentDidMount() {
    console.log('AdminAddArticle Mounted');
  }

  onCreateArticle = (event, authUser) => {
    // Post form data to articles array in DB
    this.props.firebase
      .articles()
      .push({
        title: this.state.title,
        text: this.state.text,
        userId: authUser.uid,
        createdAt: this.props.firebase.serverValue.TIMESTAMP
      })
      .then(() => {
        // this.setState({ title: '' });
        // this.setState({ text: '' });
        this.props.history.push(ROUTES.ADMIN);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };
  onChangeTitle = event => {
    this.setState({ title: event.target.value });
  };

  render() {
    const { text, title } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className='AddArticle'>
            <div className='AddArticle-container'>
              <h1 className='heading heading-primary underline'>
                Add New Article
              </h1>
              <form onSubmit={event => this.onCreateArticle(event, authUser)}>
                <label className='heading'>Title</label>
                <input
                  type='text'
                  value={title}
                  onChange={this.onChangeTitle}
                />
                <label className='heading'>Text</label>
                <textarea
                  type='textarea'
                  value={text}
                  onChange={this.onChangeText}
                />
                <button type='submit'>Send</button>
              </form>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const AdminAddArticle = withFirebase(AdminAddArticleBase);

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN]; // If user is authenticated, and admin role is not null

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AdminAddArticle);
