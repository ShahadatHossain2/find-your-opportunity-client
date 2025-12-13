import React from "react";
import homeBg from "../../assets/bg-home.png";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3>Looking For Opportunities?</h3>
        <h1>Trusted by lots of professionals across the world</h1>
        <div className="flex gap-2 mt-5">
          <Link className="btn">Find Jobs</Link>
          <Link className="btn">Login</Link>
          <Link to="/addJob" className="btn">
            Add Job
          </Link>
        </div>
      </div>
      <div className="w-1/2">
        <img src={homeBg} alt="" />
      </div>
    </div>
  );
};

export default Home;
