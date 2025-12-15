import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../context/Context";
import { Link } from "react-router";

const Header = () => {
  const { user } = use(AuthContext);
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setPhoto(data.photo);
        });
    }
  }, [user]);
  return (
    <div>
      <div className="navbar border-b">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">FindIT</a>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="DP" src={photo} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                {user ? (
                  <Link className="btn">Logout</Link>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
