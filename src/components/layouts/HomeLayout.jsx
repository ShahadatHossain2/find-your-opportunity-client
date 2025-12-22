import React from "react";
import Header from "../header/Header";
import { Outlet } from "react-router";
import Footer from "../footer/Footer";

const HomeLayout = () => {
  return (
    <div className="">
      <Header></Header>
      <div className="">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
