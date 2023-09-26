import React from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import { selectItemById } from "./itemsApiSlice";

import { selectUserById } from "../users/usersApiSlice";

const Item = ({ itemId, userId }) => {
  const navigate = useNavigate();

  const item = useSelector((state) => selectItemById(state, itemId));
  const user = useSelector((state) => selectUserById(state, userId));

  console.log("INSIDE ITEM");
  console.log(item);
  console.log(user);

  let completedClass = "";

  if (item.completed) completedClass = " completed";

  const handleEdit = () => navigate(`/dash/items/${itemId}`);

  return (
    <tr className={`table__row `}>
      <td className={`table__cell ${completedClass} group__title`}>
        {user?.username}
      </td>
      <td className={`table__cell ${completedClass} group__username`}>
        {item?.itemName}
      </td>
      <td className={`table__cell ${completedClass} group__username`}>
        {item?.quantity}
      </td>
      <td className={`table__cell ${completedClass}`}>
        <button className="icon-button table__button" onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
  );
};

export default Item;
