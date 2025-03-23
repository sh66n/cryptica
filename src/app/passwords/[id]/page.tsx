"use client";
import PasswordCard from "@/components/PasswordCard";
import { IPassword, zPassword } from "@/models/password.model";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const getData = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/passwords/${id}`
    );
    if (!res.ok) throw new Error("Something went wrong");
    const data = await res.json();
    return data.success;
  } catch (error) {
    console.error(error);
    toast("Something went wrong fetching that password!", {
      theme: "dark",
      type: "error",
      position: "bottom-right",
    });
  }
};

const PasswordDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState<{
    service_name: string;
    password: string;
    tags: string;
    user_id: string;
  }>({
    service_name: "",
    password: "",
    tags: "",
    user_id: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(password);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await getData(id);
        delete data._id;
        delete data.__v;
        setPassword(data);
        setFormData(data);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    try {
      evt.preventDefault();
      zPassword.parse(formData);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/passwords/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      toast("Edited successfully!", {
        theme: "dark",
        position: "bottom-left",
        type: "success",
      });
      router.push(`/passwords/${id}`);
    } catch (error) {
      console.log(error);
      toast(error.message, {
        theme: "dark",
        position: "bottom-left",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen h-fit bg-[#252B2C] p-1">
      <PasswordCard
        password={{
          service_name: formData.service_name,
          password: formData.password,
          tags: formData.tags,
          user_id: 1,
        }}
      />
      <div className="flex justify-center mb-4">
        <button
          className="bg-[#0084FF] rounded-lg px-4 py-2 text-white text-2xl mr-2"
          onClick={handleEditClick}
        >
          Edit
        </button>
        <button className="bg-[#FF0040] rounded-lg px-4 py-2 text-white text-2xl">
          Delete
        </button>
      </div>
      {isEditing && (
        <div className="text-white  mt-4">
          <form
            className="flex flex-col items-center text-2xl"
            onSubmit={handleSubmit}
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
            <button
              className="bg-[#0084FF] p-4 text-3xl rounded-xl"
              type="submit"
            >
              Done
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PasswordDetails;
