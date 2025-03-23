"use client";
import React, { useState } from "react";

const EditForm = ({ password }: any) => {
  const [formData, setFormData] = useState(password);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="text-white  mt-4">
      <form
        className="flex flex-col items-center text-2xl"
        // onSubmit={handleSubmit}
      >
        <div className="mb-4 w-[30rem] flex justify-between">
          <label htmlFor="service_name">Service Name</label>
          <input
            type="text"
            id="service_name"
            name="service_name"
            placeholder="Service Name"
            className="p-2 text-black"
            onChange={handleChange}
            value={formData.service_name}
          />
        </div>
        <div className="mb-4 w-[30rem] flex justify-between">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            className="p-2 text-black"
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <div className="flex mb-4">
          <div className="mr-4">
            <label htmlFor="work">Work </label>
            <input
              type="radio"
              id="work"
              name="tags"
              value="work"
              checked={formData.tags === "work"}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="personal">Personal </label>
            <input
              type="radio"
              id="personal"
              name="tags"
              value="personal"
              checked={formData.tags === "personal"}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="bg-[#0084FF] p-4 text-3xl rounded-xl" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default EditForm;
