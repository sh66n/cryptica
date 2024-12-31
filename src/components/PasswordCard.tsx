"use client";
import { IPassword } from "@/models/password.model";
import WorkIcon from "./WorkIcon";
import PersonalIcon from "./PersonalIcon";
import { useState } from "react";
import OpenEye from "./OpenEyeIcon";
import ClosedEyeIcon from "./ClosedEyeIcon";
const PasswordCard = ({ password }: { password: IPassword }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="bg-[#ABABAB] p-8 text-2xl rounded-xl mx-60 flex items-center my-8 text-white hover:shadow-2xl cursor-pointer">
      <div className="mr-4">
        {password.tags === "work" ? <WorkIcon /> : <PersonalIcon />}
      </div>
      <div className="mr-4 w-96 break-words">{password.service_name}</div>
      <div className="ml-auto break-words mr-4 w-96">
        {isVisible ? password.password : "*".repeat(password.password.length)}
      </div>
      <div className="" onClick={handleClick}>
        {isVisible ? <OpenEye /> : <ClosedEyeIcon />}
      </div>
    </div>
  );
};

export default PasswordCard;
