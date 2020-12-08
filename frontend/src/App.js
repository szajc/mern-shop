import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Shop from './components/pages/Shop';
import ShoppingCart from './components/pages/ShoppingCart';
import SelectedItem from './components/pages/SelectedItem';
//import CategoryPage from './components/pages/Category';
import OfferPage from './components/pages/Offer';
import AllShopItems from './components/pages/AllShopItems';
import Settings from './components/pages/Settings';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { useDispatch } from "react-redux";
import * as actionType from './store/actions';

import './style.css';

import UserContext from './context/UserContext';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';


const App = () => {

  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    }
    const tokenRes = await Axios.post(
      "/users/tokenIsValid", 
      null,
      { headers: { "x-auth-token": token } } 
    );
    if (tokenRes.data) {
      const userRes = await Axios.get(
        "/users/",
        { headers: { "x-auth-token": token },
      });
      setUserData({
        token,
        user: userRes.data,
      })
      dispatch({type: actionType.AUTHENTICATE, payload: true});
      dispatch({type: actionType.SET_USER_DATA, payload: {token: token, user: userRes.data}})
      await Axios.get( "/cart/all", { headers: { "x-auth-token": token }})
        .then(response => {
            dispatch({ type: actionType.ADD_WHOLE_CART, payload: response.data });
        })
    }
    
  }

  useEffect(() => {
    checkLoggedIn();
  }, [])

  return (
    <React.Fragment>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <div className="">
            <Switch>
              <Route path="/register" component={Register} />
              <ProtectedRoute exact path="/shop" component={Shop} />
              <ProtectedRoute exact path="/settings" component={Settings} />
              <ProtectedRoute exact path="/shop/allitems" component={AllShopItems} />
              <ProtectedRoute exact path="/cart" component={ShoppingCart} />
{
              //<ProtectedRoute path="/shop/page/:id" component={CategoryPage} />
              }
              <ProtectedRoute path="/shop/offer/:id" component={OfferPage} />
              <ProtectedRoute path="/shop/:id" component={SelectedItem} />
              
              <Route path="/login" component={Login} />
              <Route exact path="/" component={Login} />
            </Switch>
          </div>
        </UserContext.Provider>
      </Router>
    </React.Fragment>
  )
}

export default App;

