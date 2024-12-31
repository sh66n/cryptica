import SearchIcon from "./SearchIcon";

const SearchBar = () => {
  return (
    <div className="mx-32 relative">
      <input
        className="w-full my-4 rounded-full p-10 text-3xl shadow-xl bg-[#ABABAB] text-white placeholder-white"
        placeholder="Search..."
      />
      <SearchIcon />
    </div>
  );
};

export default SearchBar;
