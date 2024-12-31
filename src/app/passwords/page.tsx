import PasswordCard from "@/components/PasswordCard";
import SearchBar from "@/components/SearchBar";
import Tags from "@/components/Tags";
import { IPassword } from "@/models/password.model";

const getData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/passwords`);
    if (!res.ok) throw new Error(res.statusText);
    const data: IPassword[] = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch items: " + error);
    return [];
  }
};

const Passwords = async () => {
  const passwords: IPassword[] = await getData();

  return (
    <div className="h-screen w-full bg-[#252B2C] p-2">
      <SearchBar />
      <Tags />
      {passwords.map((p) => (
        <PasswordCard password={p} key={p._id} />
      ))}
    </div>
  );
};

export default Passwords;
