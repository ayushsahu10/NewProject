import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import InnerContent from "./innerContent/InnerContent";
import Notification from "./Notification";
import Search from "./Search";
import Bookmark from "./Bookmark";
import About from "./About";
import { auth } from "./firebase.js";
import db from "./firebase.js";
import PrivateRoute from "./PrivateRoute.js";
import LoginSec from "./LoginSec.js";
import RegisterSec from "./RegisterSec";
import Lottie from "react-lottie";
import animationData from "./earth.json";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setTimeout(
      () =>
        auth.onAuthStateChanged((user) => {
          if (user) {
            setLoading(true);
            db.collection("userDetails")
              .doc(user.uid)
              .get()
              .then((d) => setUserData({ ...d.data(), id: d.id }))
              .then(() => {
                setLoading(false);
                setLoggedIn(true);
                console.log(userData);
              });
          } else {
            setLoggedIn(false);
            setLoading(false);
          }
        }),
      3000
    );
  }, []);

  return (
    <div className="app">
      {loading ? (
       <div style={{display:"flex",flex:1,alignItems:"center",justifyContent:'center'}} >
       <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={"50%"}
          width={"50%"}
        />
       </div>
      ) : (
        <Router>
          {window.innerWidth > 1000 ? (
            <Sidebar userData={userData} loggedIn={loggedIn} />
          ) : null}
          <Switch>
            
            <PrivateRoute path="/feed/:postId" loggedIn={loggedIn}>
              <InnerContent userData={userData} />
            </PrivateRoute>

            <PrivateRoute path="/notifications" loggedIn={loggedIn}>
              <Notification userId={userData.id} userData={userData} />
            </PrivateRoute>
            <PrivateRoute path="/search" loggedIn={loggedIn}>
              <Search />
            </PrivateRoute>
            <PrivateRoute path="/bookmarks" loggedIn={loggedIn}>
              <Bookmark />
            </PrivateRoute>
            <PrivateRoute path="/about/:uid" loggedIn={loggedIn}>
              <About userId={userData.id}/>
            </PrivateRoute>
            <Route path="/register">
              <RegisterSec />
            </Route>
            <Route path="/login">
              <LoginSec />
            </Route>
            <Route path="/feed">
              <Feed />
            </Route>
            <Route path="/">
              <Feed />
            </Route>
            
          </Switch>
          <Widgets />

          <div className="app__bottom">
            {window.innerWidth <= 1000 ? (
              <Sidebar userData={userData} loggedIn={loggedIn} />
            ) : null}
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
