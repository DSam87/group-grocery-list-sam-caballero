import { useEffect, useState } from "react";
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

  const [optionsOpened, setOptionsOpened] = useState(true);

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const onLogoutClicked = () => sendLogout();

  const onNewItemClicked = () => {
    setOptionsOpened((prevState) => !prevState);
    navigate("/dash/items/new");
  };
  const onNewUserClicked = () => navigate("/dash/users/new");

  const onListClicked = () => {
    setOptionsOpened((prevState) => !prevState);
    navigate("/dash/items");
  };
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

  function handleClickOption() {
    setOptionsOpened((prevState) => !prevState);
  }

  let newNoteButton = null;
  if (pathname.includes("/dash")) {
    newNoteButton = (
      <button
        className=" block py-5 border-green-950 border-y-white border-y-2 md:border-y-0"
        title="New Note"
        onClick={onNewItemClicked}
      >
        Create New Item
      </button>
    );
  }

  let newUserButton = null;
  if (!pathname.includes("/dash")) {
  }

  let userButton = null;
  if (email) {
  }

  let notesButton = null;
  if (pathname.includes("/dash")) {
    notesButton = (
      <button
        className=" block py-5 border-green-950 border-y-white border-b-2 md:border-y-0"
        title="Notes"
        onClick={onListClicked}
      >
        Items
      </button>
      // <button className="icon-button" title="Notes" onClick={onListClicked}>
      //   <FontAwesomeIcon icon={faFilePen} />
      // </button>
    );
  }
  const logoutButton = (
    <button
      className=" block py-5 border-green-950 border-y-white border-b-2 md:border-y-0"
      title="Logout"
      onClick={onLogoutClicked}
    >
      Logout
    </button>
  );
  let isSmallScreen;

  if (window.innerWidth < 768) {
    isSmallScreen = true;
  }

  const errClass = isError ? "errmsg" : "offscreen";

  let buttonContent;
  if (isLoading) {
    buttonContent = <p>Logging Out...</p>;
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {notesButton}
        {logoutButton}
      </>
    );
  }

  const content = (
    <div
      className={`z-50 flex flex-col justify-center ${
        optionsOpened && isSmallScreen ? "relative" : "static"
      } items-center `}
    >
      <header
        className={`   md:p-5 w-full  m-auto bg-emerald-800 transition-all duration-200  translate-y-[0px] ${
          optionsOpened && isSmallScreen
            ? " translate-y-0 hidden"
            : "translate-y-[-500px]  "
        }`}
      >
        {isSmallScreen ? (
          <div
            className={`flex justify-between items-center flex-col md:flex-row`}
          >
            <Link to="/dash/items">
              <h1 className="text-3xl py-5 font-bold">Our Grocery Group</h1>
            </Link>
            <nav className="flex w-full flex-col md:flex-row">
              {buttonContent}
            </nav>
          </div>
        ) : (
          <nav className="flex w-full flex-row justify-between items-center sm:flex-col md:flex-row">
            <h2>Group Grocery List</h2>
            <div className="flex gap-8">{buttonContent}</div>
          </nav>
        )}
      </header>

      <button
        onClick={handleClickOption}
        className={`md:hidden  z-50 text-2xl block mx-auto p-3 w-full transition-all duration-300 bg-emerald-950 bg-opacity-90 ${
          optionsOpened ? "h-[80px]" : " h-[80px]"
        }`}
      >
        <p
          className={`inline-block   ${
            optionsOpened ? "rotate-90" : " rotate-180"
          }`}
        >
          |||
        </p>
      </button>
    </div>
  );

  return content;
};
export default DashHeader;
