import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import Search from "./components/layouts/Search";
import About from "./components/pages/About";
import SingleUser from "./components/users/SingleUser";
import axios from "axios";
import "./App.css";

const App = () => {
  const [state, setAppState] = useState({
    users: [],
    user: {},
    repos: [],
    isLoading: false,
    search: "",
  });

  const setState = (newState) => {
    setAppState((state) => ({
      ...state,
      ...newState,
    }));
  };

  useEffect(() => {
    (async () => {
      try {
        setState({
          isLoading: true,
        });

        const res = await axios.get(
          `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        setState({
          users: res.data,
          isLoading: false,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const searchUsers = async (searchText) => {
    try {
      setState({
        isLoading: true,
        search: searchText,
      });

      const res = await axios.get(
        `https://api.github.com/search/users?q=${searchText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      setState({
        users: res.data.items,
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleUser = async (username) => {
    try {
      setState({
        isLoading: true,
      });

      const res = await axios.get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      setState({
        user: res.data,
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getUserRepos = async (username) => {
    try {
      setState({
        isLoading: true,
      });

      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      setState({
        repos: res.data,
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const clearUsers = () => {
    setState({
      users: [],
    });
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Search
                searchUsers={searchUsers}
                showClear={state.users.length > 0 ? true : false}
                clearUsers={clearUsers}
                search={state.search}
              />
              <Users isLoading={state.isLoading} users={state.users} />
            </Route>
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:username"
              render={(props) => (
                <SingleUser
                  {...props}
                  getSingleUser={getSingleUser}
                  getUserRepos={getUserRepos}
                  user={state.user}
                  repos={state.repos}
                  loading={state.isLoading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
