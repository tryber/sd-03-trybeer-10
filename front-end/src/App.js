import React from 'react';
import {
  Switch, Route, BrowserRouter as Router, Redirect,
} from 'react-router-dom';
import Login from './screens/Login';
import Profile from './screens/Profile';
import MainProvider from './context/context';
import Products from './screens/Products';
import Register from './screens/Register';

function App() {
  return (
    <MainProvider>
      <Router>
        <Switch>
          <center>
            <Route exact path="/products" component={ Products } />
            <Route path="/login" component={ Login } />
            <Route path="/profile" component={ Profile } />
            <Route path="/register" component={ Register } />
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </center>
        </Switch>
      </Router>
    </MainProvider>
  );
}

export default App;
