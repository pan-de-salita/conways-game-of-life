export function Select({
  value,
  onChange,
  children,
  label,
}: {
  value: number;
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <label className="group flex h-8 cursor-pointer items-center justify-center rounded bg-gray-700 px-2 shadow-md transition ease-in hover:bg-gray-800 disabled:opacity-50">
      <select
        className="cursor-pointer bg-gray-700 transition ease-in group-hover:bg-gray-800"
        aria-label={label}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </label>
  );
}
