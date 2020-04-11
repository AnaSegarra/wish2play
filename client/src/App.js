// dependencies
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// local modules
import { Layout } from './layout/Layout';
import { Home as HomePage } from './pages/Home';
import { GameList as GamesPage } from './pages/GamesList';
import { Game as DetailPage } from './pages/GameDetail';

const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/games" exact component={GamesPage} />
        <Route path="/games/:id" exact component={DetailPage} />
      </Switch>
    </Layout>
  </Router>
);

export default App;
