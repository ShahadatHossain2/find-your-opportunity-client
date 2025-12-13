import React from "react";
import Header from "../header/Header";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <div className="">
      <div className="w-11/12 mx-auto">
        <Header></Header>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default HomeLayout;
