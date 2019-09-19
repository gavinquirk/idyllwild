import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';

import { withFirebase } from '../Firebase';

import './AdminArticleItem.css';

class AdminArticleItem extends Component {
  state = {
    loading: false,
    article: null,
    editMode: false,
    editTitle: '',
    editText: '',
    ...this.props.location.state
  };

  componentDidMount() {
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

  // State update for forms
  onChangeEditTitle = event => {
    this.setState({ editTitle: event.target.value });
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  // Toggle edit mode, set edit state to article state
  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.state.article.text,
      editTitle: this.state.article.title
    }));
  };

  onSaveArticle = () => {
    // Call onEditArticle with edit state as args, set edit mode to false
    this.onEditArticle(
      this.state.article,
      this.state.editTitle,
      this.state.editText
    );
    this.setState({ editMode: false });
  };

  onEditArticle = (article, title, text) => {
    // Destructure uid and snapshot data
    const { ...articleSnapshot } = article;

    const updatedArticle = {
      ...articleSnapshot,
      title,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    };

    // Update article with new data, add editedAt timestamp, update state
    this.props.firebase
      .article(article.uid)
      .set(updatedArticle)
      .then(
        this.setState({ article: updatedArticle }),
        console.log('Successfully Updated')
      )
      .catch(error => console.log('error: ', error));
  };

  // Remove article from database
  onRemoveArticle = uid => {
    this.props.firebase
      .article(uid)
      .update({
        disabled: true
      })
      .then(() => this.props.history.push(ROUTES.ADMIN))
      .catch(error => console.log('error: ', error));
    alert('Successfully Removed');
  };

  render() {
    const { article, loading, editMode, editTitle, editText } = this.state;

    return (
      <div className='AdminArticleItem'>
        <h1 className='heading'>Article: {article.title}</h1>
        {/* Show loading */}
        {loading && <div>Loading ...</div>}

        {article && (
          <div className='list'>
            <span>
              <strong>Article ID:</strong> {article.uid}
            </span>
            <span>
              <strong>Owner:</strong> {article.userId}
            </span>
            {/* editMode conditional rendering */}
            {editMode ? (
              <>
                <input
                  className='form-input'
                  type='text'
                  value={editTitle}
                  onChange={this.onChangeEditTitle}
                />
                <textarea
                  className='form-input'
                  type='text'
                  value={editText}
                  onChange={this.onChangeEditText}
                />
              </>
            ) : (
              <>
                <span>
                  <strong>Title:</strong> {article.title}
                </span>
                <span>
                  <strong>Text:</strong> {article.text}
                </span>
              </>
            )}

            {/* Buttons */}
            <div className='article-buttons'>
              {/* Edit buttons conditional rendering */}
              {editMode ? (
                <span>
                  <button onClick={this.onSaveArticle} className='save-button'>
                    Save
                  </button>
                  <button onClick={this.onToggleEditMode}>Cancel</button>
                </span>
              ) : (
                <button onClick={this.onToggleEditMode}>Edit</button>
              )}
              <button
                className='delete-button'
                type='button'
                onClick={() => this.onRemoveArticle(article.uid)}
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
