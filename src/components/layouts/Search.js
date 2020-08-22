import React, { useState, useContext } from "react";
import GithubContext from "../../context/gitbub/GithubContext";

const Search = () => {
  const { users, search, searchUsers, setAllUsers } = useContext(GithubContext);

  const [showError, setShowError] = useState(false);
  const [searchText, setSearchText] = useState(search);

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim() === "") {
      setShowError(true);
      return false;
    }
    setShowError(false);
    searchUsers(searchText);
  };

  const onClearClick = (e) => {
    e.preventDefault();
    setSearchText("");
    setShowError(false);
    setAllUsers([]);
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
          onChange={(e) => setSearchText(e.target.value)}
        />
        <input
          type="submit"
          value="Seacrh"
          className="btn btn-dark btn-block"
        />
        {users.length > 0 && (
          <button className="btn btn-light btn-block" onClick={onClearClick}>
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

const errorStyles = {
  border: "1px solid red",
};

export default Search;
