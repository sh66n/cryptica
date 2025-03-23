import { auth } from "@/auth";
import { handleLogout } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const session = await auth();
  return (
    <div>
      {session ? (
        <div className="flex flex-col">
          <div
            className="h-24 w-24 bg-red-100 bg-cover rounded-full"
            style={{ backgroundImage: `url(${session.user?.image})` }}
          ></div>
          <Link href="/passwords">My passwords</Link>
          <button onClick={handleLogout} className="w-fit">
            Logout
          </button>
        </div>
      ) : (
        <button>
          <Link href={"/login"}>Login</Link>
        </button>
      )}
    </div>
  );
};

export default Home;
