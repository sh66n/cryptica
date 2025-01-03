"use client";
import Loader from "@/components/Loader";
import SearchBar from "@/components/SearchBar";
import Tags from "@/components/Tags";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen h-fit w-full bg-[#252B2C] p-2">
      <SearchBar />
      <Tags />
      <div className="flex justify-center">
        <Loader color="#ffffff" />
      </div>
    </div>
  );
};

export default Loading;
