import React, { Component } from "react";
import PropTypes from 'prop-types'

class Search extends Component {
  state = {
    showError: false
  };

  static propTypes = {
    showError: PropTypes.bool.isRequired,
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if(this.state.searchText.trim() === '') {
      this.setState({
        showError: true
      });
      return false;
    }
    this.setState({
      showError: false
    });
    this.props.searchUsers(this.state.searchText);
  };

  onClearClick = (e) => {
    e.preventDefault();
    this.setState({
      searchText: '',
      showError: false
    });
    this.props.clearUsers();
  };

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <input
            className={(this.state.showError) ? 'error' : '' }
            type="text"
            name="searchText"
            id="searchText"
            required
            style={(this.state.showError) ? errorStyles : {}}
            value={this.state.searchText}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Seacrh"
            className="btn btn-dark btn-block"
          />
          {this.props.showClear && (
            <button className="btn btn-light btn-block" onClick={this.onClearClick}>
              Clear
            </button>
          )}
        </form>
      </div>
    );
  }
}

const errorStyles = {
  border: "1px solid red",
};

export default Search;
