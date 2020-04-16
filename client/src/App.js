// dependencies
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// local modules
import { Layout } from './layout/Layout';
import { Home as HomePage } from './pages/Home';
import { GameList as GamesPage } from './pages/GamesList';
import { Game as DetailPage } from './pages/GameDetail';
import { ProtectedProfile as ProfilePage } from './pages/Profile';
import { RequestPage } from './pages/UserLists/RequestPage';
import { AdminPage } from './pages/Admin';
import { RequestAdminPage } from './pages/Admin/RequestsPanel';
import { Wishlist } from './pages/UserLists/Wishlist';
import { GamesPlayed } from './pages/UserLists/GamesPlayed';

const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/games" exact component={GamesPage} />
        <Route path="/games/request" exact component={RequestPage} />
        <Route path="/games/:id" exact component={DetailPage} />
        <Route path="/wish2play/profile" exact component={ProfilePage} />
        <Route path="/wishlist/:id" exact component={Wishlist} />
        <Route path="/games-played/:id" exact component={GamesPlayed} />
        <Route path="/admin" exact component={AdminPage} />
        <Route path="/admin/request" exact component={RequestAdminPage} />
      </Switch>
    </Layout>
  </Router>
);

export default App;
