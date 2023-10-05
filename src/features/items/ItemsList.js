import React from "react";

import { useGetItemsQuery } from "./itemsApiSlice";
import { useEffect, useState } from "react";
import Item from "./Item";

const ItemsList = () => {
  const {
    data: items,
    isLoading,
    isError,
    error,
    isSuccess,
    isFetching,
  } = useGetItemsQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [isVisible, setIsVisible] = useState(" ");

  useEffect(() => {
    setIsVisible(" visible");
  }, [isSuccess]);

  let content;

  if (isLoading) return (content = <p>loading</p>);
  if (isError)
    return (content = <p className="errmsg">{error?.data?.message}</p>);

  if (isSuccess) {
    const { ids, entities } = items;

    const itemEntities = Object.values(entities);

    let tableContent = ids.map((itemId, index) => {
      return (
        <Item key={itemId} itemId={itemId} userId={itemEntities[index].user} />
      );
    });

    content = (
      <>
        <h2 id="dash-header" className={`${isVisible}`}>
          Group Items
        </h2>
        <table className={`table table--groups ${isVisible}`}>
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th group__status">
                Username
              </th>
              <th scope="col" className="table__th group__username">
                Item
              </th>
              <th scope="col" className="table__th group__username">
                Quantity
              </th>
              <th scope="col" className="table__th group__edit">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </>
    );
  }
  return content;
};

export default ItemsList;
