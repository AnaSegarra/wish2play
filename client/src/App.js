// dependencies
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// local modules
import { Layout } from './layout/Layout';
import { Home as HomePage } from './pages/Home';

const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route path="/" exact component={HomePage} />
      </Switch>
    </Layout>
  </Router>
);

export default App;
