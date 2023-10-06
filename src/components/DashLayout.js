import React from "react";
import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import Welcome from "../features/auth/Welcome";

const DashLayout = () => {
  return (
    <div className="flex flex-col flex-grow flex-shrink overflow-auto  relative h-screen w-screen sm:flex bg-emerald-900">
      <DashHeader />
      <div className="dash-container flex-auto max-h-[1300px]">
        {window.innerWidth > 640 ? <Welcome /> : ""}
        <div className={"w-full h-full bg-emerald-900 flex-auto max-h-[870px]"}>
          <Outlet />
        </div>
      </div>
      <DashFooter />
    </div>
  );
};

export default DashLayout;
