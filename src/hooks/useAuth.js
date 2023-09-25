import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  let email;
  let familyGroupId;
  let username;
  let groupCreatorLastname;
  let currentUserId;

  if (token) {
    const decoded = jwtDecode(token);
    const {
      username,
      email,
      familyGroupId,
      groupCreatorLastname,
      currentUserId,
    } = decoded.UserInfo;

    return {
      username,
      email,
      familyGroupId,
      groupCreatorLastname,
      currentUserId,
    };
  }

  return {
    username,
    email,
    familyGroupId,
    groupCreatorLastname,
    currentUserId,
  };
};

export default useAuth;
