import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const {
    username,
    email,
    familyGroupId,
    groupCreatorLastname,
    currentUserId,
  } = useAuth();

  console.log(username, currentUserId, email);

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <>
      {" "}
      {/* <p>{today}</p>
      <h1>Welcome {username}!</h1> */}
      <section className="welcome h-1">
        {email ? (
          <>
            <p>
              <Link to="/dash/group">View Group Information</Link>
            </p>
            <p>
              <Link to="/dash/users">View Users In Group</Link>
            </p>
            <p>
              <Link to="/dash/items">View Group Items</Link>
            </p>
            <br />
            <p>
              <Link to={`/dash/users/${currentUserId}`}>
                Manage User Account
              </Link>
            </p>

            <p>
              <Link to="/dash/items/new">Create Group Item</Link>
            </p>
          </>
        ) : (
          <>
            <p>
              <Link to="/dash/group/new">Crate A Group</Link>
            </p>

            <p>
              <Link to="/dash/users/new">Create New User</Link>
            </p>
          </>
        )}
      </section>
    </>
  );

  return content;
};

export default Welcome;
