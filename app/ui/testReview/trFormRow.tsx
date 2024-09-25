"use client";

export default function TrFormRow({
  label,
  children,
  required = true,
  error
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?:string[];
}) {
  const isRequired = required || true;
  return (
    <div className="text-base pt-6 flex flex-wrap w-full ">
      <div className="flex flex-wrap w-full">
        <div className="text-gray-80 font-bold w-full md:w-1/5 ">
          {label}
          {required ? (
            <span className="text-main-base textsm"> *</span>
          ) : undefined}
        </div>
        <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0 flex justify-end">
          {children}
        </div>
      </div>
      <div className="h-6 w-full flex justify-end items-center">
        <p className="text-sm text-red-warning">
            {error?.map((el)=><span>{el}</span>)}
        </p>
      </div>
    </div>
  );
}
