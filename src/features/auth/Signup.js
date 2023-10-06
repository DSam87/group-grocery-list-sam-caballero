import React from "react";
import { Link, useNavigate, useSubmit } from "react-router-dom";
import usePersist from "../../hooks/usePersist";
import { useState, useEffect } from "react";
import { setCredentials } from "./authSlice";
import { useDispatch } from "react-redux";
import { useAddNewUserMutation } from "../users/usersApiSlice";
import { useLoginMutation } from "./authApiSlice";

const Signup = () => {
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

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

  if (!isLoading && username.length >= 3) {
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

      if (accessToken) {
        dispatch(setCredentials({ accessToken }));
      } else {
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/items");
    }
  }, [isSuccess]);

  return (
    <section className="flex flex-col w-auto md:w-[400px] h-screen sm:w-screen  bg-emerald-900 p-5">
      <header>
        <h1>Signup</h1>
      </header>
      <main
        className={` ${
          isMobile ? "login w-auto h-auto sm:w-screen sm:h-screen " : ""
        }`}
      >
        {/* <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p> */}

        <form className={"form public-form"} method="post">
          <label htmlFor="username">Username:</label>
          <input
            className="form__input text-black "
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={onUsernameChange}
          ></input>
          <label htmlFor="email">E-mail:</label>
          <input
            className="form__input text-black"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onEmailChange}
          ></input>
          <label htmlFor="password">Password:</label>
          <input
            className="form__input text-black"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onPasswordChange}
          ></input>
          <label htmlFor="group-id">Group Id:</label>
          <input
            className="form__input text-black"
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

          <button
            type="submit"
            className="form__submit-button bg-white text-emerald-950 py-6 mt-5 rounded-sm"
            onClick={handleSubmit}
          >
            {" "}
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
