import React from 'react';
import './App.css';

import Layout from './components/Layout/Layout';
import Lander from './components/Lander/Lander';
import NewsFeed from './components/NewsFeed/NewsFeed';
import Events from './components/Events/Events';

import './components/ContentContainer/ContentContainer';
import ContentContainer from './components/ContentContainer/ContentContainer';

function App() {
  return (
    <div className='App'>
      <Layout>
        <Lander />
        <ContentContainer />
      </Layout>
    </div>
  );
}

export default App;
