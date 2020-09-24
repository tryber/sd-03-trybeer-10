import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './screens/Login';
import Register from './screens/Register';

function App() {
  return (
    <Router>
      <Switch>
        <center>
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
        </center>
      </Switch>
    </Router>
  );
}

export default App;
