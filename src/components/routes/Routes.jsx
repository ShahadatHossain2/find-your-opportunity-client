import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../home/Home";
import AddJob from "../jobs/AddJob";
import JobDetails from "../jobs/JobDetails";
import UpdateJob from "../jobs/UpdateJob";
import Login from "../authentication/Login";
import SignUp from "../authentication/SignUp";
import PrivateRoute from "./PrivateRoute";
import User from "../users/User";
import User2 from "../users/user2";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        loader: () =>
          fetch("http://localhost:5000/jobs").then((res) => res.json()),
        element: <Home></Home>,
      },
      {
        path: "addJob",
        Component: AddJob,
      },
      {
        path: "jobDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/jobs/${params.id}`),
        element: (
          <PrivateRoute>
            <JobDetails></JobDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "jobUpdate/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/jobs/${params.id}`),
        element: (
          <PrivateRoute>
            <UpdateJob></UpdateJob>
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        loader: () =>
          fetch("http://localhost:5000/users").then((res) => res.json()),
        Component: Login,
      },
      {
        path: "signUp",
        loader: () =>
          fetch("http://localhost:5000/users").then((res) => res.json()),
        Component: SignUp,
      },
      {
        path: "users",
        element: (
          <PrivateRoute>
            <User></User>
          </PrivateRoute>
        ),
      },
      {
        path: "users2",
        element: <User2></User2>,
      },
    ],
  },
]);
