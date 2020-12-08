import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute( {component: Component, ...rest} ) {

  let isAuth = localStorage.getItem("auth-token");
    return (
        <Route
          {...rest}
          render={(props) => 
            isAuth===""
            ? <Component {...props} />
            : <Redirect to="/shop" />
            }
        />
      )
}
