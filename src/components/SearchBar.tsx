"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SearchIcon from "./SearchIcon";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const existingQuery = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    const initialQuery = searchParams.get("query") || "";
    setQuery(initialQuery);
  }, [searchParams]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    if (existingQuery.tags) {
      router.push(`?query=${newQuery}&tags=${existingQuery.tags}`);
    } else {
      router.push(`?query=${newQuery}`);
    }
  };

  return (
    <div className="mx-32 relative">
      <form action="">
        <input
          className="w-full my-4 rounded-full p-10 text-3xl shadow-xl bg-[#ABABAB] text-white placeholder-white"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
      </form>
      <SearchIcon />
    </div>
  );
};

export default SearchBar;
