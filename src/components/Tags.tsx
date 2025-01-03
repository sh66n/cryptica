"use client";
import Link from "next/link";
import Tag from "./Tag";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const Tags = () => {
  const searchParams = useSearchParams();
  const existingQuery = Object.fromEntries(searchParams.entries());
  const router = useRouter();

  const initialTag = searchParams.get("tags") || "all";
  const [activeTag, setActiveTag] = useState<string>(initialTag);

  useEffect(() => {
    setActiveTag(initialTag);
  }, []);

  const handleClick = (tag: string) => {
    setActiveTag(tag);
    if (tag !== "all")
      if (existingQuery.query) {
        router.push(`?query=${existingQuery.query}&tags=${tag}`);
      } else {
        router.push(`?tags=${tag}`);
      }
    else router.push("/passwords");
  };

  return (
    <div className="mb-4 flex mx-44">
      <Tag
        className={
          activeTag === "all" ? "opacity-100" : "opacity-50  hover:opacity-100"
        }
        onClick={() => handleClick("all")}
      >
        All
      </Tag>
      <Tag
        className={
          activeTag === "work" ? "opacity-100" : "opacity-50  hover:opacity-100"
        }
        onClick={() => handleClick("work")}
      >
        Work
      </Tag>

      <Tag
        className={
          activeTag === "personal"
            ? "opacity-100"
            : "opacity-50  hover:opacity-100"
        }
        onClick={() => handleClick("personal")}
      >
        Personal
      </Tag>
    </div>
  );
};

export default Tags;
