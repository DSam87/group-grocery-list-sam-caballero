import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useSendLogoutMutation } from "../auth/authApiSlice";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const [sendLogout, { isSuccess: logoutIsSuccess }] = useSendLogoutMutation();

  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(" ");

  useEffect(() => {
    setIsVisible(" visible");
  }, [isSuccess]);

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [validEmail, setValidEmail] = useState(false);
  const [familyGroupId, setFamilyGroupId] = useState(user.familyGroupId);
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
    if (familyGroupId?.length === 6) {
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
      setFamilyGroupId("");
      navigate("/dash/items");
    }
  }, [isSuccess, navigate]);

  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onFamilyGroupIdChange = (e) => {
    if (e.target.value.length <= 6) setFamilyGroupId(e.target.value);
  };

  const onSaveUserClicked = async (e) => {
    if (password || email) {
      e.preventDefault();

      await updateUser({
        id: user.id,
        username,
        email,
        password,
        familyGroupId,
      });
    }
  };

  const onDeleteUserClicked = async (e) => {
    e.preventDefault();
    await deleteUser({ id: user.id, username, email, password, familyGroupId });
    await sendLogout();
    navigate("/");
  };

  let canSave =
    [validPassword, validEmail, validUsername, validFamilyGroupId].every(
      Boolean
    ) && !isLoading;

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validEmailClass = !validEmail ? "form__input--incomplete" : "";
  const validFamilyGroupIdClass = !validFamilyGroupId
    ? "form__input--incomplete"
    : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  let content = (
    <div className="outlet__window--form-container">
      <p className={errClass}>{errContent}</p>

      <form className={`form ${isVisible}`}>
        <div className="form__title-row">
          <h2>Edit User</h2>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass} text-black`}
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
          className={`form__input ${validPwdClass} text-black`}
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
          className={`form__input ${validEmailClass} text-black`}
          value={email}
          onChange={onEmailChanged}
        />
        <label className="form__label" htmlFor="familyGroupId">
          Group ID: [6 chars]{" "}
        </label>
        <input
          id="familyGroupId"
          name="familyGroupId"
          className={`form__input ${validFamilyGroupIdClass} text-black`}
          value={familyGroupId}
          onChange={onFamilyGroupIdChange}
          maxLength={6}
          minLength={6}
        />
        <div className="form__action-buttons form__action-buttons-flex">
          <button
            className={`icon-text-button ${
              canSave ? "" : "text-button-not-valid"
            }`}
            title="Save"
            disabled={!canSave}
            onClick={onSaveUserClicked}
          >
            <i className="icon-button-inline">
              <FontAwesomeIcon icon={faSave} />
              <i>Update User</i>
            </i>
          </button>
          <button
            className={`icon-text-button ${
              canSave ? "" : "text-button-not-valid"
            }`}
            title="Save"
            disabled={!canSave}
            onClick={onDeleteUserClicked}
          >
            <i className="icon-button-inline">
              <FontAwesomeIcon icon={faSave} />
              <i>Delete User</i>
            </i>
          </button>
        </div>
      </form>
    </div>
  );

  return content;
};

export default EditUserForm;
