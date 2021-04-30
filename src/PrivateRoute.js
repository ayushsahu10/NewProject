import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import {auth } from './firebase'

export default function PrivateRoute({ children,loggedIn, ...rest }) {    

  useEffect(() => {
    console.log("private auth")
  }, [])

    return (
      <Route
        {...rest}
        render={({ location }) =>
        auth.currentUser !== null ? (
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