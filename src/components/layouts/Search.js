import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = (props) => {
  const [showError, setShowError] = useState(false);
  const [searchText, setSearchText] = useState(props.search);

  const onChange = (e) => setSearchText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim() === "") {
      setShowError(true);
      return false;
    }
    setShowError(false);
    props.searchUsers(searchText);
  };

  const onClearClick = (e) => {
    e.preventDefault();
    setSearchText("");
    setShowError(false);
    props.clearUsers();
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          className={showError ? "error" : ""}
          type="text"
          name="searchText"
          id="searchText"
          style={showError ? errorStyles : {}}
          value={searchText}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Seacrh"
          className="btn btn-dark btn-block"
        />
        {props.showClear && (
          <button className="btn btn-light btn-block" onClick={onClearClick}>
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  showClear: PropTypes.bool.isRequired,
};

const errorStyles = {
  border: "1px solid red",
};

export default Search;
