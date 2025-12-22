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
      fetch(`http://localhost:5000/users/${user.email}`)
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
    <div className="sticky top-0 z-[1000] w-full transition-all duration-300">
      {/* 2. Added bg-base-100/70 (transparency) and backdrop-blur */}
      <div className="navbar border-b border-base-content/10 bg-base-100/70 backdrop-blur-md">
        <div className="flex-1">
          <Link to="/" className="font-bold hover:text-blue-400 text-xl">
            FindIT
          </Link>
        </div>

        <div className="flex gap-2">
          {user && <p className="hidden sm:block">{user.displayName}</p>}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="DP" src={user ? photo : userIcon} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {user && (
                <li>
                  <Link className="justify-between">Users</Link>
                </li>
              )}
              <li>
                <a>Settings</a>
              </li>
              <li>
                {user ? (
                  <button onClick={handleSignOut} className="w-full text-left">
                    Logout
                  </button>
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
