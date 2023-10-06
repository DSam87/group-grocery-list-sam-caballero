import React from "react";

import { useGetItemsQuery } from "./itemsApiSlice";
import { useEffect, useState } from "react";
import Item from "./Item";

const ItemsList = () => {
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isSmallScreen = width <= 768;

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
      <div
        className={`flex flex-col  flex-auto justify-center h-full overflow-scroll`}
      >
        <h2 id="dash-header" className={`${isVisible}`}>
          Group Items
        </h2>
        <table
          className={`flex flex-col w-full flex-auto text-sm text-left text-gray-500 bg-slate-50 mt-6 dark:text-gray-400 overflow-auto  h-full ${isVisible} ${
            isSmallScreen ? "h-screen" : "h-full"
          }`}
        >
          <thead className="flex justify-between flex-row text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 overflow-auto ">
            <tr className="">
              {/* <th scope="col" className="table__th group__status">
                Username
              </th> */}
              <th scope="col" className="px-6 py-3">
                Item
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="h-1 flex-1">{tableContent}</tbody>
        </table>
      </div>
    );
  }
  return content;
};

export default ItemsList;
