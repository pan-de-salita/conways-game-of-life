export function Button({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="-w8 flex h-8 items-center justify-center rounded-full bg-gray-700 px-4 shadow-md transition ease-in hover:bg-gray-800"
    >
      {children}
    </button>
  );
}
