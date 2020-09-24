import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './screens/Login';
import Profile from './screens/Profile';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={ Login } />
        <Route path="/profile" component={ Profile } />
      </Switch>
    </Router>
  );
}

export default App;
