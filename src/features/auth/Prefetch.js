import { groupsApiSlice } from "../groups/groupsApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { itemsApiSlice } from "../items/itemsApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { store } from "../../app/store";
import useAuth from "../../hooks/useAuth";

const Prefetch = () => {
  useEffect(() => {
    console.log("Subscribing");
    const notes = store.dispatch(groupsApiSlice.endpoints.getGroups.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const items = store.dispatch(itemsApiSlice.endpoints.getItems.initiate());

    return () => {
      console.log("unsubscribing");
      notes.unsubscribe();
      users.unsubscribe();
      items.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;
