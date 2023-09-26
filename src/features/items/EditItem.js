import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { itemsApiSlice, selectItemById } from "./itemsApiSlice";
import { useSelector } from "react-redux";
import EditItemForm from "./EditItemForm";

const EditItem = () => {
  console.log("Heoolo");
  const { id } = useParams();
  const item = useSelector((state) => selectItemById(state, id));
  console.log(item);

  const content = item ? <EditItemForm item={item} /> : <p>Loading...</p>;

  return content;
};

export default EditItem;
