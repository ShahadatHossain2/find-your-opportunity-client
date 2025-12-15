import React from "react";
import { FaArrowLeft, FaCalendarCheck } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { useLoaderData, useNavigate, useNavigation } from "react-router";

const JobDetails = () => {
  const { _id, company, title, salary, type, description, deadline } =
    useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <span>Loading...</span>;
  }
  return (
    <div className="">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center cursor-pointer gap-1 hover:text-blue-500"
      >
        <FaArrowLeft></FaArrowLeft>Back
      </button>
      <div className="mt-10 w-4/6 mx-auto">
        <MdDescription className="text-5xl"></MdDescription>
        <h3 className="text-2xl font-bold my-3">Company Name: {company}</h3>
        <div className="text-gray-600">
          <p>
            <span>Job Title: </span> {title}
          </p>
          <p>
            <span>Job Type: </span> {type}
          </p>
          <p>
            <span>Salary: </span> {salary}
          </p>
          <p>
            <span>Requirements: </span> {description}
          </p>
          <p className="flex items-center gap-2 my-2">
            <FaCalendarCheck></FaCalendarCheck>
            <span className="font-bold">Deadline: </span> {deadline}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
