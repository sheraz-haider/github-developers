import React, { useContext, useEffect } from "react";
import UserItem from "./UserItem";
import Spinner from "../layouts/Spinner";
import GithubContext from "../../context/gitbub/GithubContext";
import axios from "axios";

const Users = () => {
  const { users, isLoading, setLoading, setAllUsers } = useContext(GithubContext);

  useEffect(() => {
    (async () => {
      try {
        if (!users.length) {
          setLoading();

          const res = await axios.get(
            `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
          );

          setAllUsers(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line
  }, []);

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
};

const userStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Users;
