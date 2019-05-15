import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

import './AdminArticleItem.css';

class AdminArticleItem extends Component {
  state = {
    loading: false,
    article: null,
    ...this.props.location.state
  };

  componentDidMount() {
    console.log('ARTICLE ITEM MOUNTED');
    // If article state is passed, don't query for article
    if (this.state.article) {
      return;
    }

    this.setState({ loading: true });

    // Else, query db for article data
    this.props.firebase
      .article(this.props.match.params.id)
      .once('value', snapshot => {
        this.setState({
          article: snapshot.val(),
          loading: false
        });
      });
  }

  onEditUserDetails = () => {
    console.log('Edit User Details clicked...');
  };

  onDeleteUser = () => {
    console.log('Delete User clicked...');
  };

  render() {
    const { article, loading } = this.state;

    return (
      <div className='AdminArticleItem'>
        <h1 className='heading'>Article: {article.title}</h1>
        {loading && <div>Loading ...</div>}

        {article && (
          <div className='list'>
            <span>
              <strong>Article ID:</strong> {article.uid}
            </span>
            <span>
              <strong>Title:</strong> {article.title}
            </span>
            <span>
              <strong>Owner:</strong> {article.userId}
            </span>
            <span>
              <strong>Text:</strong> {article.text}
            </span>

            <div className='article-buttons'>
              <button type='button' onClick={this.onEditArticleDetails}>
                Edit Article
              </button>
              <button
                className='delete-button'
                type='button'
                onClick={this.onDeleteArticle}
              >
                Delete article
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(AdminArticleItem);
