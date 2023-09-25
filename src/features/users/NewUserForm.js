import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewUserMutation } from "./usersApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [familyGroupId, setFamilyGroupId] = useState("");

  // Remember we have to check if the familyfamilyGroupId even exists
  const [familyFamilyGroupId, setFamilyFamilyGroupId] = useState();

  const [validPassword, setValidPassword] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validFamilyGroupId, setValidFamilyGroupId] = useState(false);

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
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setEmail("");
      setFamilyFamilyGroupId("");
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onFamilyGroupIdChange = (e) => {
    if (e.target.value.length <= 6) setFamilyGroupId(e.target.value);
  };

  const canSave =
    [validPassword, validUsername, validEmail].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({
        username,
        password,
        email,
        familyGroupId,
      });
    }
  };

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validEmailClass = !validEmail ? "form__input--incomplete" : "";
  const validFamilyGroupIdClass = !validFamilyGroupId
    ? "form__input--incomplete"
    : "";

  let content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveUserClicked}>
        <div className="form__title-row">
          <h2>New User</h2>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
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
        <label className="form__label" htmlFor="familyGroupId">
          Group ID: [6 chars]{" "}
          <i className="form__label-inline-text">
            (Don't have a FamilyGroupId?{" "}
            <Link to="/dash/group/new">Click here!</Link>)
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
              <i>Save User</i>
            </i>
          </button>
        </div>
      </form>
    </>
  );

  return content;
};

export default NewUserForm;
