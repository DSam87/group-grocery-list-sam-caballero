import React, { useState, useEffect } from "react";
import {
  itemsApiSlice,
  useUpdateItemMutation,
  useDeleteItemMutation,
} from "./itemsApiSlice";
import { useNavigate } from "react-router-dom";

const EditItemForm = ({ item }) => {
  console.log(item);

  const [isCompleted, setIsCompleted] = useState(item.completed);
  const [itemName, setItemName] = useState(item.itemName);
  const [quantity, setQuantity] = useState(item.quantity);

  const navigate = useNavigate();

  const [updateItem, { isLoading, isSuccess, isError, errror }] =
    useUpdateItemMutation();

  const [deleteItem, { isSuccess: deleteIsSuccess }] = useDeleteItemMutation();

  let content;

  const onItemNameChanged = (e) => {
    setItemName(e.target.value);
  };

  const onQuantityChanged = (e) => {
    setQuantity(e.target.value);
  };

  const onIsCompletedChange = () => {
    setIsCompleted((prev) => !prev);
  };

  const canSave = true;

  const validItemName = 1;
  const validPwdClass = 1;

  const [isVisible, setIsVisible] = useState(" ");

  useEffect(() => {
    setIsVisible("visible");
  }, []);

  const onUpdateClicked = async (e) => {
    e.preventDefault();
    await updateItem({ quantity, itemName, isCompleted, id: item._id });
  };

  const onDeleteClicked = async (e) => {
    e.preventDefault();
    await deleteItem({ quantity, itemName, isCompleted, id: item._id });
  };

  useEffect(() => {
    if (isSuccess || deleteIsSuccess) {
      setItemName("");
      setQuantity("");
      setIsCompleted("");
      navigate("/dash/items");
    }
  }, [isSuccess, deleteIsSuccess, navigate]);

  content = (
    <div className="outlet__window--form-container">
      <form
        className={`form ${isVisible}`}
        onsubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="form__title-row">
          <h2>Edit User</h2>
        </div>
        <label className="form__label" htmlFor="username">
          Item Name: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validItemName}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={itemName}
          onChange={onItemNameChanged}
        />

        <label className="form__label" htmlFor="password">
          Quantity:
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          value={quantity}
          onChange={onQuantityChanged}
        />

        <label className="form__label" htmlFor="email">
          Is Completed:
        </label>
        <input
          type="checkbox"
          id="email"
          name="email"
          className={`form__input completed__input`}
          checked={isCompleted}
          onChange={onIsCompletedChange}
        />

        <div className="form__action-buttons form__action-buttons-flex">
          <button
            className={`icon-text-button ${
              canSave ? "" : "text-button-not-valid"
            }`}
            title="Save"
            disabled={!canSave}
            onClick={onUpdateClicked}
          >
            <i className="icon-button-inline">
              <i>Update Item</i>
            </i>
          </button>
          <button
            className={`icon-text-button ${
              canSave ? "" : "text-button-not-valid"
            }`}
            title="Save"
            disabled={!canSave}
            onClick={onDeleteClicked}
          >
            <i className="icon-button-inline">
              <i>Delete Item</i>
            </i>
          </button>
        </div>
      </form>
    </div>
  );

  return content;
};

export default EditItemForm;
