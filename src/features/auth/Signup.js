import React from "react";
import { Link, useNavigate, useSubmit } from "react-router-dom";
import usePersist from "../../hooks/usePersist";
import { useState, useEffect } from "react";
import { setCredentials } from "./authSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";
import { useAddNewUserMutation } from "../users/usersApiSlice";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [familyGroupId, setFamilyGroupId] = useState("");

  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onFamilyGroupIdChange = (e) => {
    setFamilyGroupId(e.target.value);
  };

  let canSave;

  if (!isLoading && username.length > 3) {
    canSave = true;
  }

  const handleSubmit = async function (e) {
    e.preventDefault();
    if (canSave) {
      const { accessToken } = await login({
        email: email,
        password,
        username,
        familyGroupId,
        isSignup: true,
      }).unwrap();

      // dispatch(setCredentials({ accessToken }));

      if (accessToken) {
        dispatch(setCredentials({ accessToken }));
      } else {
        console.log("No accessToken");
      }
    }
  };

  useEffect(() => {}, [isSuccess, username, password, familyGroupId, email]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/items");
    }
  }, [isSuccess]);

  return (
    <section className="public">
      <header>
        <h1>User Login</h1>
      </header>
      <main className="login ">
        {/* <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p> */}

        <form className={"public-form"} method="post" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            className="form__input"
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={onUsernameChange}
          ></input>
          <br />
          <label htmlFor="email">E-mail:</label>
          <input
            className="form__input"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onEmailChange}
          ></input>
          <br />
          <label htmlFor="password">Password:</label>
          <input
            className="form__input"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onPasswordChange}
          ></input>
          <br />
          <label htmlFor="group-id">Group Id:</label>
          <input
            className="form__input"
            type="text"
            name="group-id"
            id="group-id"
            value={familyGroupId}
            onChange={onFamilyGroupIdChange}
            maxLength={8}
          ></input>
          <div className="public__no-group-container">
            <i>No Groui ID? </i>
            <Link className={"public-link"} to="/create-group">
              Create Group Id
            </Link>
          </div>

          <button type="submit" className="form__submit-button">
            Create User
          </button>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );
};

export default Signup;
