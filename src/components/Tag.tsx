const Tag = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={`bg-[#0084FF] w-fit py-2 px-4 rounded-full text-white  cursor-pointer mx-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Tag;
