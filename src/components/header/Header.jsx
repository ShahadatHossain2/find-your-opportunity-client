import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../context/Context";
import { Link } from "react-router";
import userIcon from "../../assets/user.png";
import { toast } from "react-toastify";

const Header = () => {
  const { user, signOutUser } = use(AuthContext);
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    if (user) {
      fetch(
        `https://find-your-opportunity-server-2.onrender.com/users/${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setPhoto(data.photo);
        });
    }
  }, [user]);
  const handleSignOut = () => {
    signOutUser()
      .then((result) => {
        toast("You Logged Out!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="navbar border-b">
        <div className="flex-1">
          <Link to="/" className="font-bold hover:text-blue-400 text-xl">
            FindIT
          </Link>
        </div>
        <div></div>
        <div className="flex gap-2">
          {user && <p>{user.displayName}</p>}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {user ? (
                  <img alt="DP" src={photo} />
                ) : (
                  <img alt="DP" src={userIcon} />
                )}
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>{user && <Link className="justify-between">Users</Link>}</li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                {user ? (
                  <Link onClick={handleSignOut}>Logout</Link>
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
