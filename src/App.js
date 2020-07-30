import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import Search from "./components/layouts/Search";
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    isLoading: false,
  };

  async componentDidMount() {
    try {
      this.setState({
        isLoading: true,
      });

      const res = await axios.get(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      this.setState({
        users: res.data,
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
    }
  }

  searchUsers = async (searchText) => {
    try {
      this.setState({
        isLoading: true,
      });

      const res = await axios.get(
        `https://api.github.com/search/users?q=${searchText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      this.setState({
        users: res.data.items,
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  clearUsers = () => {
    this.setState({
      users: [],
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Search
                  searchUsers={this.searchUsers}
                  showClear={this.state.users.length > 0 ? true : false}
                  clearUsers={this.clearUsers}
                />
                <Users
                  isLoading={this.state.isLoading}
                  users={this.state.users}
                />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
