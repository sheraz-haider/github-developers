import React from "react";
import UserItem from "./UserItem";
import PropTypes from "prop-types";
import Spinner from "../layouts/Spinner";

const Users = ({ users, isLoading }) => {
  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyles}>
        {users.map((user) => {
          return <UserItem user={user} key={user.id} />;
        })}
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const userStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Users;
