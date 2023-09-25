import React from "react";

import { useEffect, useState } from "react";
import { useAddNewGroupMutation } from "../groups/groupsApiSlice";
import { useAddNewUserMutation } from "../users/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { useLoginMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { selectCurrentToken, setCredentials } from "./authSlice";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// form
// // We create a and account
// // ask if you already have a group to join or creating new one.
// // send request to create user and create group.
// // Link that user to the new or old group.

const SignupGroup = () => {
  const [
    login,
    {
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
      error: loginerror,
      isError: loginIsError,
    },
  ] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // controlled state
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);

  const [familyGroupId, setFamilyGroupId] = useState("");
  const [validFamilyGroupId, setValidFamilyGroupId] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  // controled state functions
  const onFamilyGroupIdChange = (e) => setFamilyGroupId(e.target.value);
  const onLastNameChanged = (e) => setLastName(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onUsernameChanged = (e) => setUsername(e.target.value);

  // effects to check valid fields
  useEffect(() => {
    setValidLastName(USER_REGEX.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    if (familyGroupId.length === 6) {
      setValidFamilyGroupId(true);
    } else {
      setValidFamilyGroupId(false);
    }
  }, [familyGroupId]);

  useEffect(() => {
    if (loginIsSuccess) {
      setUsername("");
      setLastName("");
      setPassword("");
      setEmail("");
      setFamilyGroupId("");
      navigate("/dash/items");
    }
  }, [loginIsSuccess, navigate]);

  const canSave =
    [
      validPassword,
      validUsername,
      validEmail,
      validFamilyGroupId,
      validLastName,
    ].every(Boolean) && !loginIsLoading;

  const generateString = (e) => {
    e.preventDefault();
    let result = "";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 6) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    setFamilyGroupId(result);
  };

  const onSaveGroupClicked = async (e) => {
    e.preventDefault();

    const { accessToken } = await login({
      email: email,
      password,
      lastName,
      username,
      familyGroupId,
      isGroupSignup: true,
    }).unwrap();

    dispatch(setCredentials({ accessToken }));
  };

  const errClass = loginIsError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validLastNameClass = !validLastName ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validEmailClass = !validEmail ? "form__input--incomplete" : "";
  const validFamilyGroupIdClass = !validFamilyGroupId
    ? "form__input--incomplete"
    : "";

  let content = (
    <section className="public">
      <main className="login ">
        <form className="form public-form" onSubmit={onSaveGroupClicked}>
          <div className="form__title-row">
            <h2>New Group</h2>
          </div>
          <label className="form__label" htmlFor="username">
            Firstname: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            className={`form__input ${validUserClass}`}
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={username}
            onChange={onUsernameChanged}
          />
          <label className="form__label" htmlFor="lastName">
            Lastname: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            className={`form__input ${validLastNameClass}`}
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="off"
            value={lastName}
            onChange={onLastNameChanged}
          />

          <label className="form__label" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            name="email"
            className={`form__input ${validEmailClass}`}
            value={email}
            onChange={onEmailChanged}
          />

          <label className="form__label" htmlFor="password">
            Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
          </label>
          <input
            className={`form__input ${validPwdClass}`}
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChanged}
          />

          <label className="form__label" htmlFor="familyGroupId">
            Group ID: [6 chars]{" "}
            <div className="public__no-group-container">
              <i>Generate Group Id? </i>
              <button
                className={"public-link public-link-id"}
                to="/create-group-id"
                onClick={generateString}
              >
                Generate Group Id
              </button>
            </div>
          </label>
          <input
            readOnly
            id="familyGroupId"
            name="familyGroupId"
            className={`form__input ${validFamilyGroupIdClass}`}
            value={familyGroupId}
            onChange={onFamilyGroupIdChange}
            onClick={generateString}
            maxLength={6}
            placeholder="e.g. 123abc"
          />
          <button className="form__submit-button">Create Group</button>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );

  return content;
};

export default SignupGroup;
