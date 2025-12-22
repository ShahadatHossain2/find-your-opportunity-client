import React, { use } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../context/Context";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const allUsers = useLoaderData();
  const { userLogin, signInWithGoogle } = use(AuthContext);
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
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const googleUser = {
          name: result.user?.displayName,
          email: result.user?.email,
          photo: result.user?.photoURL,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };
        if (!allUsers.find((user) => user.email === googleUser.email)) {
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(googleUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                navigate("/");
              }
            });
        }
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
    <div className="my-10">
      <div className="w-lg text-center mx-auto mb-5">
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login using Google
        </button>
      </div>
      <form onSubmit={handleLogin}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-lg mx-auto border p-4">
          <h3 className="text-lg font-bold">Login with you credentials</h3>
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
