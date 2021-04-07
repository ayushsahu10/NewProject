import React from 'react';
import "./App.css";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import InnerContent from './innerContent/InnerContent';
import Notification from './Notification'
import Search from './Search'
import Bookmark from './Bookmark'
import About from './About'
import LoginSec from './LoginSec';
import RegisterSec from './RegisterSec';

function App() {


  return (
    <div className="app">
    <Router>
    { window.innerWidth > 1000 ? <Sidebar /> : null  }
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

        { window.innerWidth <= 1000 ? <Sidebar /> : null  }
        
    </Router>

    </div>
  );
}

export default App;
