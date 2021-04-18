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
import { BounceLoader, DotLoader, HashLoader,RingLoader,PropagateLoader} from 'react-spinners';
import loader from "./assets/loader.gif";
import { Height } from "@material-ui/icons";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

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
              });
          } else{
            setLoggedIn(false);
            setLoading(false);
          }
        }),
      2200
    );
  }, []);

  return (
    <div className="app">
      {loading ? (
        <div className="loader"> 
        <RingLoader size={100} color='rgba(56,56,209,255)' />
        {/* <img src={"loader.gif"} style={{height:"100%" , width:"100%"}}></img> */}
        </div> 
      ) : (
        <Router>
          {window.innerWidth > 1000 ? <Sidebar userData={userData} /> : null}
          <Switch>
            <Route path="/feed/:postId">
              <InnerContent />
            </Route>
            <Route path="/notifications">
              <Notification />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/bookmarks">
              <Bookmark />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/feed">
              <Feed />
            </Route>
            <Route path="/">
              <Feed />
            </Route>
          </Switch>
          <Widgets />

          {window.innerWidth <= 1000 ? <Sidebar userData={userData} /> : null}
        </Router>
      )}
    </div>
  );
}

export default App;
