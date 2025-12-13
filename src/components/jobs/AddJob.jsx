import React from "react";

const AddJob = () => {
  const handleAddJob = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const jobDetails = Object.fromEntries(formData.entries());
    console.log(jobDetails);
    fetch("http://localhost:5000/jobs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(jobDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className="bg-blue-100 p-4 rounded mt-2">
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
