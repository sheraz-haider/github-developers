import React, { Fragment } from "react";
import PropTypes from "prop-types";
import RepoItem from "./RepoItem";

const Repos = ({ repos }) => {
  return (
    <Fragment>
      {repos.map((repo) => (
        <RepoItem repo={repo} key={repo.id} />
      ))}
    </Fragment>
  );
};

Repos.propTypes = {
  repos: PropTypes.array.isRequired,
}

export default Repos;
