import { Routes, Route, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import useTitle from "./hooks/useTitle";

import GroupList from "./features/groups/GroupList";
import SingleUser from "./features/users/SingleUser";
import UsersList from "./features/users/UsersList";
import ItemsList from "./features/items/ItemsList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import Prefetch from "./features/auth/Prefetch";
import NewGroupForm from "./features/groups/NewGroupForm";
import PersistLogin from "./features/auth/PersistLogin";
import NewItemForm from "./features/items/NewItemForm";
import SignupGroup from "./features/auth/SignupGroup";

function App() {
  useTitle("Group Grocery List");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup></Signup>} />
        <Route path="create-group" element={<SignupGroup />} />

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path="dash" element={<DashLayout />}>
              {/* <Route index element={<Welcome />} /> */}

              <Route path="users">
                <Route index element={<UsersList />}></Route>
                <Route path=":id" element={<EditUser />}></Route>
                <Route path="new" element={<NewUserForm />}></Route>
              </Route>

              <Route path="group">
                <Route index element={<GroupList />} />
                <Route path="new" element={<NewGroupForm />} />
              </Route>

              <Route path="items">
                <Route index element={<ItemsList />} />
                <Route path="new" element={<NewItemForm />} />
              </Route>
            </Route>
            {/* </Route> */}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
