"use client";
import { IPassword } from "@/models/password.model";
import WorkIcon from "./WorkIcon";
import PersonalIcon from "./PersonalIcon";
import { useState } from "react";
import OpenEye from "./OpenEyeIcon";
import ClosedEyeIcon from "./ClosedEyeIcon";
import Link from "next/link";
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
      {password._id ? (
        <Link href={`/passwords/${password._id}`} className="w-96 break-words">
          <div className="mr-4 hover:underline hover:text-[#0084FF]">
            {password.service_name}
          </div>
        </Link>
      ) : (
        <div className="mr-4">{password.service_name}</div>
      )}

      <div className="ml-auto break-words mr-4 w-96">
        {isVisible ? password.password : "*".repeat(password.password?.length)}
      </div>
      <div className="" onClick={handleClick}>
        {isVisible ? <OpenEye /> : <ClosedEyeIcon />}
      </div>
    </div>
  );
};

export default PasswordCard;
