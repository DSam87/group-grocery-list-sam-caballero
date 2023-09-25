import React from "react";
import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import Welcome from "../features/auth/Welcome";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className="dash-container">
        <Welcome />
        <div className={"outlet-window"}>
          <Outlet />
        </div>
      </div>
      <DashFooter />
    </>
  );
};

export default DashLayout;
