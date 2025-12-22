import React, { use } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link, Navigate, useNavigate, useRevalidator } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/Context";

const ViewJobs = ({ job }) => {
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const { user } = use(AuthContext);

  const { _id, company, title, salary, type, description, deadline } = job;
  const handleDelete = () => {
    if (!user) {
      return navigate("/login");
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/jobs/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            Swal.fire({
              title: "Deleted!",
              text: "Job Post has been deleted.",
              icon: "success",
            });
            revalidator.revalidate();
          });
      }
    });
  };
  return (
    <div>
      <div className="bg-white hover:bg-blue-100 rounded-xl p-4 border border-cyan-50 shadow shadow-cyan-200">
        <h3 className="text-xl font-bold">{company} is Hiring</h3>
        <div className="text-gray-600">
          <p>
            <span>Job Title: </span> {title}
          </p>
          <p>
            <span>Job Type: </span> {type}
          </p>
          {/* <p>
            <span>Salary: </span> {salary}
          </p>
          <p>
            <span>Requirements: </span> {description}
          </p> */}
          <p>
            <span className="font-bold">Deadline: </span> {deadline}
          </p>
        </div>
        <div>
          <Link
            to={`/jobDetails/${_id}`}
            className="btn btn-xs mr-2 bg-blue-400"
          >
            <FaEye fill="white"></FaEye>
          </Link>
          <Link to={`/jobUpdate/${_id}`} className="btn btn-xs mr-2 bg-sky-300">
            <FaEdit></FaEdit>
          </Link>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-xs bg-red-400"
          >
            <MdDeleteOutline fill="white"></MdDeleteOutline>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewJobs;
