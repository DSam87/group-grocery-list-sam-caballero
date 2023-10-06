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

  let completedClass = "";

  if (item.completed) completedClass = " bg-green-500 line-through";

  const handleEdit = () => navigate(`/dash/items/${itemId}`);

  return (
    <tr
      className={`flex flex-row justify-between bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${completedClass}`}
    >
      {/* <td className={`table__cell ${completedClass} group__title`}>
        {user?.username}
      </td> */}
      <td className={`px-6 py-3`}>{item?.itemName}</td>
      <td className={`px-6 py-3`}>{item?.quantity}</td>
      <td className={`px-6 py-3 ${completedClass}`}>
        <button
          className="w-[50px] text-center items-center"
          onClick={handleEdit}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
  );
};

export default Item;
