import React, { useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import Pikaday from "pikaday";
import Swal from "sweetalert2";

const AddJob = () => {
  const navigate = useNavigate();
  const myDatepicker = useRef(null);
  useEffect(() => {
    const picker = new Pikaday({
      field: myDatepicker.current,
    });
    return () => picker.destroy();
  }, []);
  const handleAddJob = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const jobDetails = Object.fromEntries(formData.entries());
    console.log(jobDetails);
    fetch("https://find-your-opportunity-server-2.onrender.com/jobs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(jobDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div className="bg-blue-100 p-4 rounded mt-2 ">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center cursor-pointer gap-1 hover:text-blue-500"
      >
        <FaArrowLeft></FaArrowLeft>Back
      </button>

      <h3 className="text-2xl my-5 font-bold text-white">
        Add Your Vacancy Post
      </h3>
      <form onSubmit={handleAddJob}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Company Name</legend>
          <input
            type="text"
            className="input md:w-1/2"
            name="company"
            placeholder="Type here"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Job Title</legend>
          <input
            type="text"
            className="input md:w-1/2"
            name="title"
            placeholder="Type here"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Salary Range</legend>
          <input
            type="text"
            className="input md:w-1/2"
            name="salary"
            placeholder="Type here"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Job type</legend>
          <select className="select md:w-1/2" name="type">
            <option disabled selected>
              --Select--
            </option>
            <option>Full-time</option>
            <option>Intern</option>
            <option>Part-Time</option>
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Job Description</legend>
          <textarea
            className="textarea md:w-1/2"
            placeholder="Type Here"
            name="description"
          ></textarea>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Last application date</legend>
          <input
            type="text"
            className="input pika-single"
            name="deadline"
            defaultValue="Pick a date"
            ref={myDatepicker}
          />
        </fieldset>
        <input
          className="btn mt-2 md:w-1/2 rounded"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default AddJob;
