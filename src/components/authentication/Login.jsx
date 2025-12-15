import React, { use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/Context";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { userLogin } = use(AuthContext);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());
    userLogin(email, password)
      .then((result) => {
        console.log(result);
        toast(`Logged in as ${result.displayName}!`);
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };
  return (
    <div className="mt-10">
      <form onSubmit={handleLogin}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-lg mx-auto border p-4">
          <h3 className="text-lg font-bold">Login with you credentials</h3>
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="Email"
            name="email"
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
            name="password"
          />

          <input type="submit" value="Login" className="btn btn-neutral mt-4" />
          <span>Forgot Password?</span>
          <span>
            New in this website? Please{" "}
            <Link to="/signUp" className="text-blue-400 underline">
              SignUp
            </Link>
          </span>
        </fieldset>
      </form>
      <ToastContainer position="top-center" autoClose={2000}></ToastContainer>
    </div>
  );
};

export default Login;
