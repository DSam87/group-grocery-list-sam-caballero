import { useEffect, useState, useRef } from "react";
import { useAddNewItemMutation } from "./itemsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NewItemForm = () => {
  const [addNewItem, { isLoading, isSuccess, isError, error }] =
    useAddNewItemMutation();

  const [isVisible, setIsVisible] = useState(" ");

  useEffect(() => {
    setIsVisible(" visible");
  }, [isSuccess]);

  const { username, email, familyGroupId, groupCreatorLastname } = useAuth();

  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [validItemName, setValidItemName] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [validQuantity, setValidQuantity] = useState(true);

  const onItemNameChanged = (e) => setItemName(e.target.value);
  const onQuantityChanged = (e) => setQuantity(+e.target.value);

  useEffect(() => {
    setValidItemName(typeof itemName === "string" && itemName.length >= 3);
  }, [itemName, validItemName]);

  useEffect(() => {
    setValidQuantity(typeof quantity === typeof 1);
  }, [quantity, validQuantity]);

  useEffect(() => {
    setIsVisible(" visible");
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setItemName("");
      setQuantity(1);
      navigate("/dash");
    }
  }, [isSuccess]);

  const canSave = [validItemName, validQuantity].every(Boolean) && !isLoading;

  const onSaveItemClicked = async (e) => {
    e.preventDefault();

    if (canSave) {
      await addNewItem({
        email,
        quantity,
        itemName,
      });
    }
    navigate("/dash/items");
  };

  const onCancelClicked = async (e) => {
    e.preventDefault();
    navigate("/dash/items");
  };

  const errClass = isError ? "errmsg" : "offscreen";
  const validItemNameClass = !validItemName ? "form__input--incomplete" : "";
  const validQuantityClass = !validQuantity ? "form__input--incomplete" : "";

  let content = (
    <div className="outlet__window--form-container">
      <p className={errClass}>{error?.data?.message}</p>

      <form
        className={`flex flex-col  ${isVisible}`}
        onSubmit={onSaveItemClicked}
      >
        <div className="form__title-row">
          {/* <h2>Add New Item to {groupCreatorLastname}'s Group</h2> */}
          <h2>Add New Item</h2>
        </div>
        <label className="form__label" htmlFor="itemName">
          Item Title: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input text-black ${validItemNameClass}`}
          id="itemName"
          name="itemName"
          type="text"
          autoComplete="off"
          value={itemName}
          onChange={onItemNameChanged}
        />
        <label className="form__label" htmlFor="quantity">
          Quantity: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input text-black ${validQuantityClass}`}
          id="quantity"
          name="quantity"
          type="number"
          autoComplete="off"
          value={quantity}
          onChange={onQuantityChanged}
        />

        <div className="flex flex-row ">
          <button
            className={`icon-text-button bg-white rounded-md mt-5 text-black ${
              canSave ? "" : "text-button-not-valid"
            }`}
            title="Save"
            disabled={!canSave}
          >
            <p className="icon-button-inline">
              <FontAwesomeIcon icon={faSave} />
              <i>Add Item</i>
            </p>
          </button>
        </div>
      </form>
    </div>
  );

  return content;
};

export default NewItemForm;
