import PasswordCard from "@/components/PasswordCard";
import SearchBar from "@/components/SearchBar";
import Tags from "@/components/Tags";
import { IPassword } from "@/models/password.model";
import { Suspense } from "react";
import Loading from "./loading";
import AddNew from "@/components/AddNew";
import Link from "next/link";

export const revalidate = 0;

const getData = async ({ query, tags }: URLSearchParams) => {
  try {
    let res;
    if (tags && query) {
      res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/passwords?tags=${tags}&query=${query}`
      );
    } else if (tags) {
      res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/passwords?tags=${tags}`
      );
    } else if (query) {
      res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/passwords?query=${query}`
      );
    } else {
      res = await fetch("http://localhost:3000/api/passwords", {
        method: "GET",
        credentials: "include", // This is crucial
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await res.json();
      console.log(body);
    }
    if (!res.ok) throw new Error(res.statusText);
    const data: IPassword[] = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch items: " + error);
    return [];
  }
};

const Passwords = async ({
  searchParams,
}: {
  searchParams: Promise<URLSearchParams>;
}) => {
  const params = await searchParams;
  const passwords: IPassword[] = await getData(params);

  return (
    <div className="min-h-screen h-fit w-full bg-[#252B2C] p-2">
      <SearchBar />
      <Tags />
      {params.query && (
        <div className="mx-48 text-gray-400 text-xl">
          Search results for "{params.query}"
        </div>
      )}
      <Suspense fallback={<Loading />}>
        {passwords.map((p) => (
          <PasswordCard password={p} key={p._id} />
        ))}
      </Suspense>
      <Link
        className="fixed h-20 w-20 bottom-10 right-10 rounded-lg flex items-center justify-center p-4 bg-[#37A13E] hover:bg-[#1a5c1e] cursor-pointer"
        href="/passwords/new"
      >
        <AddNew />
      </Link>
    </div>
  );
};

export default Passwords;
