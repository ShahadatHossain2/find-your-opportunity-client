import React, { use, useState } from "react";
import homeBg from "../../assets/bg-home.png";
import { Link, useLoaderData, useRevalidator } from "react-router";
import ViewJobs from "../jobs/ViewJobs";
import { FaClipboard } from "react-icons/fa";
import { AuthContext } from "../context/Context";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  const initialJobs = useLoaderData();
  const [showAll, setShowAll] = useState(false);
  const [jobs, setJobs] = useState(initialJobs);
  const { user, signOutUser } = use(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then((result) => {
        toast("You Logged Out!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSort = (order) => {
    let sorted = [];
    if (order === "oldest") {
      sorted = [...jobs].sort(
        (a, b) => new Date(b.deadline) - new Date(a.deadline)
      );
    }
    if (order === "newest") {
      sorted = [...jobs].sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );
    }
    setJobs(sorted);
  };

  const visibleJobs = showAll ? jobs : jobs.slice(0, 4);

  return (
    <div className=" bg-pink-50 p-4">
      <div className="w-11/12 mx-auto md:flex justify-between items-center">
        <div className="pl-4">
          <h3 className="font-bold text-2xl">Looking For Opportunities?</h3>
          <h1>Trusted by lots of professionals across the world</h1>
          <div className="flex gap-2 my-5">
            {user && (
              <Link
                to="/users"
                className="font-bold text-white btn bg-gradient-to-r from-amber-200 to-blue-200 hover:from-yellow-200 hover:to-blue-600 shadow-md rounded-lg"
              >
                Users
              </Link>
            )}
            {user ? (
              <Link
                onClick={handleSignOut}
                className="font-bold text-white btn bg-gradient-to-r from-amber-200 to-blue-200 hover:from-yellow-200 hover:to-blue-600 shadow-md rounded-lg"
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/login"
                className="font-bold text-white btn bg-gradient-to-r from-amber-200 to-blue-200 hover:from-yellow-200 hover:to-blue-600 shadow-md rounded-lg"
              >
                Login
              </Link>
            )}
            <Link
              to="/addJob"
              className="font-bold text-white btn bg-gradient-to-r from-amber-200 to-blue-200 hover:from-yellow-200 hover:to-blue-600 shadow-md rounded-lg"
            >
              Add Job
            </Link>
          </div>
        </div>
        <div className="w-1/2">
          <img src={homeBg} alt="" />
        </div>
      </div>
      <section className="mt-10 w-11/12 mx-auto">
        <div className="dropdown dropdown-center">
          <div tabIndex={0} role="button" className="btn m-1">
            Click ⬇️
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <button className="" onClick={() => handleSort("newest")}>
                New to old
              </button>
            </li>
            <li>
              <button className="" onClick={() => handleSort("oldest")}>
                Old to New
              </button>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {visibleJobs.map((job) => (
            <ViewJobs key={job._id} job={job}></ViewJobs>
          ))}
        </div>
        <div className="flex justify-center my-5">
          <button
            className="flex cursor-pointer items-center gap-1 text-2xl font-bold hover:text-blue-500"
            onClick={() => setShowAll(!showAll)}
          >
            {" "}
            <FaClipboard></FaClipboard>
            {showAll ? "Show Less" : "Show All Vacancy"}
          </button>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Home;
