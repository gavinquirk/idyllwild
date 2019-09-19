import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

import './AdminArticleList.css';

class AdminArticleList extends Component {
  state = {
    loading: false,
    articles: []
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase
      .articles()
      .orderByChild('disabled') // Filter for articles which are not disabled
      .equalTo(false || null)
      .once('value', snapshot => {
        const articlesObject = snapshot.val();
        const articlesList = Object.keys(articlesObject).map(key => ({
          ...articlesObject[key],
          uid: key
        }));
        this.setState({
          articles: articlesList,
          loading: false
        });
      });
  }

  render() {
    const { articles, loading } = this.state;

    return (
      <div className='AdminArticleList'>
        <h1 className='heading'>Articles</h1>
        {loading && <div>Loading ...</div>}
        <ul>
          {articles.map(article => (
            <li key={article.uid}>
              <span>
                <strong>ID:</strong> {article.uid}
              </span>
              <span>
                <strong>Title:</strong> {article.title}
              </span>
              <span>
                <strong>Owner:</strong> {article.userId}
              </span>
              <span>
                <Link
                  className='article-details-btn'
                  to={{
                    pathname: `${ROUTES.ADMIN}/articles/${article.uid}`,
                    state: { article } // Pass article data to details component
                  }}
                >
                  Details
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withFirebase(AdminArticleList);
