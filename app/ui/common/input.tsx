import Image from "next/image";

export default function Input({ defaultValue,required,type,placeHolder,id,name }: { defaultValue?: string,required?:boolean,type?:string,placeHolder?:string;id?:string;name?:string}) {

  return (
    <div className="max-w-80 w-full">
      <input
        id={id&& id}
        name={name&& name}
        className=" w-full border border-gray-50 px-2 py-1 rounded-lg shadow-customShadow"
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeHolder&& placeHolder}
      />
    </div>
  );
}
