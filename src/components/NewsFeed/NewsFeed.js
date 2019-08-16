import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import './NewsFeed.css';

class NewsFeedBase extends Component {
  state = {
    articles: [],
    loading: false,
    limit: 10
  };

  componentDidMount() {
    this.onListenForArticles();
  }

  formatTime = timestamp => {
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const formattedDate = new Date(timestamp);
    return formattedDate.toLocaleDateString('en-US', options);
  };

  onListenForArticles() {
    this.setState({ loading: true });
    this.props.firebase
      .articles()
      .orderByChild('disabled') // Filter for articles which are not disabled
      .equalTo(false || null)
      // .orderByChild('createdAt')
      .limitToFirst(this.state.limit)
      .once('value', snapshot => {
        const articleObject = snapshot.val();

        if (articleObject) {
          // Convert articleObject into array
          const articleList = Object.keys(articleObject)
            .map(key => ({
              ...articleObject[key],
              uid: key
            }))
            .reverse();
          this.setState({
            articles: articleList,
            loading: false
          });
        } else {
          this.setState({ articles: null, loading: false });
        }
      });
  }

  render() {
    // Destructure articles from state
    const { articles } = this.state;

    return (
      <div
        className='NewsFeed'
        // style={this.props.expandState ? { width: '50%' } : { width: '50%' }}
      >
        <span className='heading-span underline'>
          <h1 className='heading heading-primary'>News Feed</h1>
          <i
            // className='far fa-plus-square'
            style={this.props.expandState ? { opacity: '1' } : { opacity: '0' }}
            onClick={this.props.expandEventsHandler}
          />
        </span>
        {/* Articles Section */}

        {articles.length >= 1 ? (
          articles.map(article => (
            <div key={article.uid} className='article'>
              <div className='article--heading'>
                <Link
                  to={{
                    pathname: `/articles/${article.uid}`,
                    state: { article } // Pass article data to details component
                  }}
                  className='hover'
                >
                  <h2 className='heading'>{article.title}</h2>
                </Link>
              </div>
              <div className='article--content'>
                <p>{article.text}</p>
                <p className='article--more-details'>
                  <Link
                    to={{
                      pathname: `/articles/${article.uid}`,
                      state: { article } // Pass event data to details component
                    }}
                    className='hover'
                  >
                    More details...
                  </Link>
                </p>

                <p className='posted-date'>
                  Posted: {this.formatTime(article.createdAt)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}

const NewsFeed = withFirebase(NewsFeedBase);

export default NewsFeed;
