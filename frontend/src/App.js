import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Header from './components/layout/Header';
import UserContext from './context/UserContext';

import './style.css';

function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid", 
        null,
        { headers: { "x-auth-token": token } } 
      );
      if (tokenRes.data) {
        const userRes = await Axios.get(
          "http://localhost:5000/users/",
          { headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        })
      }
    }

    checkLoggedIn();
  }, [])

  return (
    <>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <div className="container">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
