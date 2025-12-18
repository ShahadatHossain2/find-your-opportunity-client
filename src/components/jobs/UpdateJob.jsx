import React, { useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router";
import Pikaday from "pikaday";
import Swal from "sweetalert2";

const UpdateJob = () => {
  const { _id, company, title, salary, type, description, deadline } =
    useLoaderData();
  const navigate = useNavigate();
  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedInfo = Object.fromEntries(formData.entries());
    console.log(updatedInfo);
    fetch(`https://find-your-opportunity-server-2.onrender.com/jobs/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: "Successfully Updated!",
            icon: "success",
          });
        }
        console.log(data);
      });
  };
  const myDatepicker = useRef(null);
  useEffect(() => {
    const picker = new Pikaday({
      field: myDatepicker.current,
    });
    return () => picker.destroy();
  }, []);
  return (
    <div className="bg-blue-100 p-4 rounded mt-2 ">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center cursor-pointer gap-1 hover:text-blue-500"
      >
        <FaArrowLeft></FaArrowLeft>Back
      </button>

      <h3 className="text-2xl my-5 font-bold text-white">
        Update Your Vacancy Post
      </h3>
      <form onSubmit={handleUpdate}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Company Name</legend>
          <input
            type="text"
            className="input md:w-1/2"
            name="company"
            defaultValue={company}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Job Title</legend>
          <input
            type="text"
            className="input md:w-1/2"
            name="title"
            defaultValue={title}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Salary Range</legend>
          <input
            type="text"
            className="input md:w-1/2"
            name="salary"
            defaultValue={salary}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Job type</legend>
          <select className="select md:w-1/2" name="type" defaultValue={type}>
            <option>Full-time</option>
            <option>Intern</option>
            <option>Part-Time</option>
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Job Description</legend>
          <textarea
            className="textarea md:w-1/2"
            defaultValue={description}
            name="description"
          ></textarea>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Last application date</legend>
          <input
            type="text"
            className="input pika-single md:w-1/2"
            name="deadline"
            defaultValue={`${deadline}`}
            ref={myDatepicker}
          />
        </fieldset>
        <input
          className="btn mt-2 md:w-1/2 rounded"
          type="submit"
          value="Update"
        />
      </form>
    </div>
  );
};

export default UpdateJob;
