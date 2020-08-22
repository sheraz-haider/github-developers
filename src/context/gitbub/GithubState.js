import React, { useReducer } from "react";
import GithubContext from "./GithubContext";
import GithubReducer from "./GithubReducer";
import axios from "axios";

const GithubState = (props) => {
  /**
   * State
   */
  const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
    search: "",
  };

  /**
   *  Mutations/Reducer
   */
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  /**
   *  Actions
   */
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  const setAllUsers = (users) => {
    dispatch({
      type: "SET_ALL_USERS",
      payload: users,
    });
  };

  const setSearchText = (text) => {
    dispatch({
      type: "SET_SEARCH_TEXT",
      payload: text,
    });
  };

  const searchUsers = async (searchText) => {
    try {
      setLoading();
      setSearchText(searchText);

      const res = await axios.get(
        `https://api.github.com/search/users?q=${searchText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      setAllUsers(res.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleUser = async (username) => {
    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      dispatch({
        type: "GET_SINGLE_USER",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getUserRepos = async (username) => {
    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      dispatch({
        type: "GET_USER_REPOS",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   *  Return GithubContext Provider
   */
  return (
    <GithubContext.Provider
      value={{
        ...state,
        setLoading,
        setAllUsers,
        searchUsers,
        setSearchText,
        getSingleUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
