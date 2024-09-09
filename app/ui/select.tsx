import Image from "next/image";

export default function Select({
  id,
  name,
  required,
  children,
}: {
  id?: string;
  name?: string;
  required?:boolean
  children: React.ReactNode;
}) {
  const isRequired = required || false;
  return (
    <div className="max-w-80 w-full">
      <select
        name={name && name}
        id={id && id}
        required={isRequired}
        className="w-full border border-gray-50 px-2 py-1 rounded-lg shadow-customShadow"
      >
        {children}
      </select>
    </div>
  );
}
