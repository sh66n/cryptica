"use client";

import { SyncLoader } from "react-spinners";

const Loader = ({ color }: { color: string }) => {
  return <SyncLoader loading={true} color={color} />;
};

export default Loader;
