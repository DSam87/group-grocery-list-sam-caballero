import React from "react";

import { useEffect, useState } from "react";
import { useAddNewGroupMutation } from "./groupsApiSlice";
import { useAddNewUserMutation } from "../users/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// form
// // We create a and account
// // ask if you already have a group to join or creating new one.
// // send request to create user and create group.
// // Link that user to the new or old group.

const NewGroupForm = () => {
  const [addNewGroup, { isLoading, isSuccess, isError, error }] =
    useAddNewGroupMutation();

  const [
    addNewUser,
    {
      isLoading: userIsLoading,
      isSuccess: userIsSuccess,
      isError: userIsError,
      error: usererror,
    },
  ] = useAddNewUserMutation();

  const navigate = useNavigate();

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
    if (isSuccess && userIsSuccess) {
      setUsername("");
      setLastName("");
      setPassword("");
      setEmail("");
      setFamilyGroupId("");
      navigate("/dash/users");
    }
  }, [isSuccess, userIsSuccess, navigate]);

  useEffect(() => {
    async function addUserAsync() {
      await addNewUser({
        password,
        email,
        familyGroupId: familyGroupId,
        username,
      });
    }
    if (isSuccess) {
      addUserAsync();
    }
  }, [isSuccess]);

  const canSave =
    [
      validPassword,
      validUsername,
      validEmail,
      validFamilyGroupId,
      validLastName,
    ].every(Boolean) && !isLoading;

  const onSaveGroupClicked = async (e) => {
    e.preventDefault();

    if (canSave) {
      await addNewGroup({
        password,
        creatorEmail: email,
        familyGroupId,
        familyLastName: lastName,
      });
    }
  };

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validLastNameClass = !validLastName ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validEmailClass = !validEmail ? "form__input--incomplete" : "";
  const validFamilyGroupIdClass = !validFamilyGroupId
    ? "form__input--incomplete"
    : "";

  let content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveGroupClicked}>
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
          <i className="form__label-inline-text">
            (Already have a group to link to?{" "}
            <Link to="/dash/users/new">Click here!</Link>)
          </i>
        </label>
        <input
          id="familyGroupId"
          name="familyGroupId"
          className={`form__input ${validFamilyGroupIdClass}`}
          value={familyGroupId}
          onChange={onFamilyGroupIdChange}
          maxLength={6}
        />
        <div className="form__action-buttons form__action-buttons-flex">
          <button
            className={`icon-text-button ${
              canSave ? "" : "text-button-not-valid"
            }`}
            title="Save"
            disabled={!canSave}
          >
            <i className="icon-button-inline">
              <FontAwesomeIcon icon={faSave} />
              <i>Create Group</i>
            </i>
          </button>
        </div>
      </form>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </>
  );

  return content;
};

export default NewGroupForm;
