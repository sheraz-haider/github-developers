import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import Search from "./components/layouts/Search";
import About from "./components/pages/About";
import SingleUser from "./components/users/SingleUser";
import GithubState from "./context/gitbub/GithubState";
import NotFound from './components/pages/404'
import "./App.css";

const App = () => {
  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Search />
                <Users />
              </Route>
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:username" component={SingleUser} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
