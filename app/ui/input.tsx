import Image from "next/image";

export default function Input({ defaultValue,required,type }: { defaultValue?: string,required?:boolean,type?:string }) {

  return (
    <div className="max-w-80 w-full">
      <input
        className=" w-full border border-gray-50 px-2 py-1 rounded-lg"
        type={type}
        defaultValue={defaultValue}
        required={required}
      />
    </div>
  );
}
