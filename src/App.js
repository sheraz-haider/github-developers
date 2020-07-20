import React, { Component } from "react";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
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

      const res = await axios.get("https://api.github.com/users");

      this.setState({
        users: res.data,
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Users isLoading={this.state.isLoading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
