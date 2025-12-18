import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../home/Home";
import AddJob from "../jobs/AddJob";
import JobDetails from "../jobs/JobDetails";
import UpdateJob from "../jobs/UpdateJob";
import Login from "../authentication/Login";
import SignUp from "../authentication/SignUp";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        loader: () =>
          fetch(
            "https://find-your-opportunity-server-2.onrender.com/jobs"
          ).then((res) => res.json()),
        element: <Home></Home>,
      },
      {
        path: "addJob",
        Component: AddJob,
      },
      {
        path: "jobDetails/:id",
        loader: ({ params }) =>
          fetch(
            `https://find-your-opportunity-server-2.onrender.com/jobs/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <JobDetails></JobDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "jobUpdate/:id",
        loader: ({ params }) =>
          fetch(
            `https://find-your-opportunity-server-2.onrender.com/jobs/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <UpdateJob></UpdateJob>
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        loader: () =>
          fetch(
            "https://find-your-opportunity-server-2.onrender.com/users"
          ).then((res) => res.json()),
        Component: Login,
      },
      {
        path: "signUp",
        loader: () =>
          fetch(
            "https://find-your-opportunity-server-2.onrender.com/users"
          ).then((res) => res.json()),
        Component: SignUp,
      },
    ],
  },
]);
