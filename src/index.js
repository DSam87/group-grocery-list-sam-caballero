import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import { Provider } from "react-redux";
import { store } from "./app/store";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <div className="h-screen w-screen">
                <App />
              </div>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
