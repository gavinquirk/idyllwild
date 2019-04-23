import React from 'react';
import './App.css';

import Layout from './components/Layout/Layout';
import Lander from './components/Lander/Lander';
import NewsFeed from './components/NewsFeed/NewsFeed';
import Events from './components/Events/Events';

function App() {
  return (
    <div className='App'>
      <Layout>
        <Lander />
        <NewsFeed />
        <Events />
      </Layout>
    </div>
  );
}

export default App;
