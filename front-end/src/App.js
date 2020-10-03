import React from 'react';
import {
  Switch, Route, BrowserRouter as Router, Redirect,
} from 'react-router-dom';
import Login from './screens/Login';
import Profile from './screens/Profile';
import MainProvider from './context/context';
import Products from './screens/Products';
import Register from './screens/Register';
import OrderDetail from './screens/OrderDetail';
import Checkout from './screens/Checkout';
import Orders from './screens/Orders';
import OrdersAdmin from './screens/OrdersAdmin';

function App() {
  return (
    <MainProvider>
      <Router>
        <Switch>
          <center>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login" component={ Login } />
            <Route path="/register" component={ Register } />
            <Route exact path="/products" component={ Products } />
            <Route exact path="/checkout" component={ Checkout } />
            <Route path="/profile" component={ Profile } />
            <Route exact path="/orders" component={ Orders } />
            <Route path="admin/orders" component={ OrdersAdmin } />
            <Route path="/orders/:id" component={ OrderDetail } />
          </center>
        </Switch>
      </Router>
    </MainProvider>
  );
}

export default App;
