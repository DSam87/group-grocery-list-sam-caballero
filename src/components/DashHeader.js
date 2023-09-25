import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const {
    username,
    email,
    familyGroupId,
    groupCreatorLastname,
    currentUserId,
  } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const onLogoutClicked = () => sendLogout();

  const onNewItemClicked = () => navigate("/dash/items/new");
  const onNewUserClicked = () => navigate("/dash/users/new");
  const onListClicked = () => navigate("/dash/items");
  const onGroupClicked = () => navigate("/dash/group");
  const onUsersClicked = () => navigate(`/dash/users/${currentUserId}`);

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  let newNoteButton = null;
  if (pathname.includes("/dash")) {
    newNoteButton = (
      <button>Create New Note</button>
      // <button
      //   className="icon-button"
      //   title="New Note"
      //   onClick={onNewItemClicked}
      // >
      //   <FontAwesomeIcon icon={faFileCirclePlus} />
      // </button>
    );
  }

  let newUserButton = null;
  if (!pathname.includes("/dash")) {
    newUserButton = (
      <button>Add New User</button>
      // <button
      //   className="icon-button"
      //   title="New User"
      //   onClick={onNewUserClicked}
      // >
      //   <FontAwesomeIcon icon={faUserPlus} />
      // </button>
    );
  }

  let userButton = null;
  if (email) {
    userButton = (
      <button>User Profile</button>
      // <button className="icon-button" title="Users" onClick={onUsersClicked}>
      //   <FontAwesomeIcon icon={faUserGear} />
      // </button>
    );
  }

  let notesButton = null;
  if (pathname.includes("/dash")) {
    notesButton = (
      <button title="Notes" onClick={onListClicked}>
        Notes
      </button>
      // <button className="icon-button" title="Notes" onClick={onListClicked}>
      //   <FontAwesomeIcon icon={faFilePen} />
      // </button>
    );
  }

  const logoutButton = (
    <button title="Logout" onClick={onLogoutClicked}>
      Logout
    </button>
    // <button className="icon-button" title="Logout" onClick={onLogoutClicked}>
    //   <FontAwesomeIcon icon={faRightFromBracket} />
    // </button>
  );

  const errClass = isError ? "errmsg" : "offscreen";

  let buttonContent;
  if (isLoading) {
    buttonContent = <p>Logging Out...</p>;
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {notesButton}
        {userButton}
        {logoutButton}
      </>
    );
  }

  const content = (
    <>
      <header className="dash-header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to="/dash/items">
            <h1 className="dash-header__title">Our Grocery Group</h1>
          </Link>
          <nav className="dash-header__nav">{buttonContent}</nav>
        </div>
      </header>
    </>
  );

  return content;
};
export default DashHeader;
