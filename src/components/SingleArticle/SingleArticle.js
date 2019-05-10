import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

import './SingleArticle.css';

class SingleArticleBase extends Component {
  state = {
    article: null,
    loading: false,
    ...this.props.location.state
  };

  componentDidMount() {
    // If event state is passed, don't query for user
    if (this.state.article) {
      console.log('Article data received from landing page');
      return;
    }

    this.setState({ loading: true });

    // Else, query db for article data
    console.log('Querying for article data');
    this.props.firebase
      .article(this.props.match.params.id)
      .once('value', snapshot => {
        this.setState({
          article: snapshot.val(),
          loading: false
        });
      });
  }

  componentWillUnmount() {
    // End listener for article data
    this.props.firebase.article(this.props.match.params.id).off();
  }

  render() {
    const { article, loading } = this.state;
    console.log('Rendering SingleArticle component...');
    return (
      <div className='SingleArticle'>
        {loading && <div>Loading ...</div>}
        {article && (
          <>
            <h1>{article.title}</h1>
            <p>{article.text}</p>
          </>
        )}
      </div>
    );
  }
}

const SingleArticle = withFirebase(SingleArticleBase);

export default SingleArticle;
