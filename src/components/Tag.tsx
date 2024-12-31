const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#0084FF] w-fit py-2 px-4 rounded-full text-white opacity-50 hover:opacity-100 cursor-pointer mx-2">
      {children}
    </div>
  );
};

export default Tag;
