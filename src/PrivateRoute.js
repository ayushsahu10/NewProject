import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,

} from "react-router-dom";


export default function PrivateRoute({ children,loggedIn, ...rest }) {    
    return (
      <Route
        {...rest}
        render={({ location }) =>
        loggedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login"
              }}
            />
          )
        }
      />
    );
  }