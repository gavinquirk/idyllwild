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

  render() {
    const { article, loading } = this.state;
    return (
      <div className='SingleArticle'>
        {loading && <div>Loading ...</div>}
        {article && (
          <>
            <h1 className='underline'>{article.title}</h1>
            <p>{article.text}</p>
          </>
        )}
      </div>
    );
  }
}

const SingleArticle = withFirebase(SingleArticleBase);

export default SingleArticle;
