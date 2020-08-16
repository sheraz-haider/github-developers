import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import Search from "./components/layouts/Search";
import About from "./components/pages/About";
import SingleUser from "./components/users/SingleUser";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
    search: "",
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
        search: searchText,
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

  getSingleUser = async (username) => {
    try {
      this.setState({
        isLoading: true,
      });

      const res = await axios.get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      this.setState({
        user: res.data,
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  getUserRepos = async (username) => {
    try {
      this.setState({
        isLoading: true,
      });

      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      this.setState({
        repos: res.data,
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
                  search={this.state.search}
                />
                <Users
                  isLoading={this.state.isLoading}
                  users={this.state.users}
                />
              </Route>
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:username" render={props => (
                <SingleUser {...props} getSingleUser={this.getSingleUser} getUserRepos={this.getUserRepos} user={this.state.user} repos={this.state.repos} loading={this.state.isLoading} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
