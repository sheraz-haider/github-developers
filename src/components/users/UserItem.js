import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import GithubContext from "../../context/gitbub/GithubContext";

const UserItem = ({ user }) => {
  const { setLoading } = useContext(GithubContext);

  const { login, avatar_url } = user;

  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt=""
        className="round-img"
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>
      <div>
        <Link
          to={"user/" + login}
          className="btn btn-dark btn-sm my-1"
          onClick={() => setLoading()}
        >
          More
        </Link>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
