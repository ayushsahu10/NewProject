import "./App.css";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import InnerContent from './innerContent/InnerContent';


function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar></Sidebar>
        <Switch>
          <Route path="/feed/:feedId">
            <InnerContent />
          </Route>
          <Route path="/">
            <Feed />
          </Route>
        </Switch>
        <Widgets />
      </div>
    </Router>
  );
}

export default App;
