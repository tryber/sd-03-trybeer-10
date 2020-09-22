import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './screens/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
