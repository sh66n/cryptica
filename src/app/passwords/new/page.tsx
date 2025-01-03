"use client";
import PasswordCard from "@/components/PasswordCard";
import { zPassword } from "@/models/password.model";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const New = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    user_id: "",
    tags: "work",
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    try {
      evt.preventDefault();
      zPassword.parse(formData);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/passwords`,
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      toast("Added successfuly!", {
        theme: "dark",
        position: "bottom-left",
        type: "success",
      });
      router.push("/passwords");
    } catch (error) {
      toast("Please fill out all fields!", {
        theme: "dark",
        position: "bottom-left",
        type: "error",
      });
    }
  };

  return (
    <div className="bg-[#252B2C] min-h-screen h-fit text-white p-2">
      <div className="mt-4">
        <PasswordCard
          password={{
            _id: "1",
            service_name: formData.service_name,
            password: formData.password,
            tags: formData.tags,
            user_id: 1,
          }}
        />
      </div>
      <form
        className="flex flex-col items-center text-2xl"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 w-[30rem] flex justify-between">
          <label htmlFor="serviceName">Service Name</label>
          <input
            type="text"
            id="serviceName"
            name="service_name"
            placeholder="Service Name"
            className="p-2 text-black"
            onChange={handleChange}
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

export default New;
