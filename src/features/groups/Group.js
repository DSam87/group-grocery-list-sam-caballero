import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectGroupById } from "./groupsApiSlice";

const Group = ({ groupId }) => {
  const group = useSelector((state) => selectGroupById(state, groupId));

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/dash/group/${groupId}`);
  };

  return (
    <tr className="table__row">
      <td className="table__cell group__title">{group.familyGroupId}</td>
      <td className="table__cell group__username">{group.familyLastName}</td>
      <td className="table__cell group__username">{group.creatorEmail}</td>
      <td className="table__cell">
        <button className="icon-button table__button" onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
  );
};

export default Group;
