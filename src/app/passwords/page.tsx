import PasswordCard from "@/components/PasswordCard";
import SearchBar from "@/components/SearchBar";
import Tags from "@/components/Tags";
import { IPassword } from "@/models/password.model";
import { Suspense } from "react";
import Loading from "./loading";

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
      res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/passwords`);
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
    </div>
  );
};

export default Passwords;
