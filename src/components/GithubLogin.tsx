"use client";
import Image from "next/image";
import { useState } from "react";

const GithubLogin = ({ handleLogin }: { handleLogin: () => Promise<void> }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await handleLogin(); // Call the login logic (e.g., API request)
    } catch (error) {
      console.error("Login failed:", error);
      setIsSubmitting(false); // Re-enable the button if the login fails
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-4 flex justify-center items-center"
    >
      <button
        type="submit"
        className={`w-fit flex bg-white rounded-lg items-center pr-8 ${
          isSubmitting ? "cursor-not-allowed opacity-50" : "hover:shadow-xl"
        }`}
        disabled={isSubmitting}
      >
        <Image src={"/github.png"} alt="" height={50} width={50} />
        <span className="text-2xl">
          {isSubmitting ? "Signing in..." : "Sign in with Github"}
        </span>
      </button>
    </form>
  );
};

export default GithubLogin;
