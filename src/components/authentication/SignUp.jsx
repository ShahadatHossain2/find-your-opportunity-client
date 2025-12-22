import React, { use } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../context/Context";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";

const SignUp = () => {
  const allUsers = useLoaderData();
  const { createUser, signInWithGoogle, sendVerification } = use(AuthContext);
  const navigate = useNavigate();
  const handleGoogleSignUp = () => {
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
  const handleSignUp = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password, ...restInfo } = Object.fromEntries(
      formData.entries()
    );
    createUser(email, password)
      .then((result) => {
        const newUser = {
          email,
          ...restInfo,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };
        sendVerification().then(() => {
          if (!allUsers.find((user) => user.email === email)) {
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(newUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  Swal.fire({
                    title: "Verification Email Send! Please Check!!.",
                    icon: "success",
                  });
                  navigate("/login");
                }
              });
          }
        });
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
      <Link
        to="/"
        className="flex items-center  gap-1 text-blue-400 hover:text-green-200 font-bold"
      >
        <FaArrowLeft></FaArrowLeft> Back to home
      </Link>
      <div className="w-lg mx-auto mb-5">
        <h3 className="text-center text-2xl font-bold mb-5">Create Account</h3>
        <button
          onClick={handleGoogleSignUp}
          className="btn bg-white w-full text-black border-[#e5e5e5]"
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
          Sign Up with Google
        </button>
      </div>
      <form onSubmit={handleSignUp}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-lg mx-auto border p-4">
          <label className="label">Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Name"
            name="name"
          />

          <label className="label">Photo</label>
          <input
            type="photo"
            className="input w-full"
            placeholder="Photo URL"
            name="photo"
          />

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

          <button className="btn btn-neutral mt-4">Sign Up</button>
          <span>
            Already have account? Please{" "}
            <Link to="/login" className="text-blue-400 underline">
              Login
            </Link>
          </span>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;
