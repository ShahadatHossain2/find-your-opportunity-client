import React from "react";
import Header from "../header/Header";
import { Outlet } from "react-router";
import Footer from "../footer/Footer";

const HomeLayout = () => {
  return (
    <div className="">
      <Header></Header>
      <div className="w-11/12 mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
