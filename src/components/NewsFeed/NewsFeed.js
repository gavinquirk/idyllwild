import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

import './NewsFeed.css';

class NewsFeedBase extends Component {
  state = {
    articles: [],
    loading: false
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
      // .orderByChild('createdAt')
      // .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const articleObject = snapshot.val();

        if (articleObject) {
          // Convert articleObject into array
          const articleList = Object.keys(articleObject).map(key => ({
            ...articleObject[key],
            uid: key
          }));
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
        style={this.props.expandState ? { width: '20%' } : { width: '80%' }}
      >
        <span className='heading-span underline'>
          <h1 className='heading heading-primary'>News</h1>
          <i
            className='far fa-plus-square'
            style={this.props.expandState ? { opacity: '1' } : { opacity: '0' }}
            onClick={this.props.expandEventsHandler}
          />
        </span>
        {/* Articles Section */}

        {articles.length >= 1 ? (
          articles.map(article => (
            <div key={article.uid} className='article'>
              <div className='article--heading'>
                <h3 className='heading'>{article.title}</h3>
                <span className='article--date'>
                  {this.formatTime(article.createdAt)}
                </span>
              </div>
              <div className='article--content'>
                <p>{article.text}</p>
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
