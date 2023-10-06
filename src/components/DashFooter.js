import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const { username, email, familyGroupId, groupCreatorLastname } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = null;

  if (pathname !== "/dash") {
    goHomeButton = (
      <button
        className="dash-footer__button icon-button"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  const content = (
    <footer className="flex flex-col md:flex-row md:justify-between bg-emerald-950  bottom-0 w-full">
      {/* {goHomeButton} */}
      <p>
        Current User: <b>{username}</b>
      </p>
      <p>
        Current Group: "<b>{groupCreatorLastname}</b>'s Group
      </p>
      <p>
        Current Group Id: <b>{familyGroupId}</b>
      </p>
    </footer>
  );

  return content;
};

export default DashFooter;
