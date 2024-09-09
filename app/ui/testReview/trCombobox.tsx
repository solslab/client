import clsx from "clsx";
import React, { useState } from "react";
interface ProblemType{
    value:string;
    label:string;
}

const TrComboBox = ({
  list,
  onClick,
  className,
}: {
  list: ProblemType[];
  onClick?: (el:string) => void;
  className?:string;
}) => {
  const [value, setValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="relative" data-hs-combo-box="">
      <div className={`relative max-w-80 w-full shadow-customShadow ${className&& className}`}>
        <input
          className=" w-full border border-gray-50 px-2 py-1 rounded-lg ps-4 pe-9 block  focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          type="text"
          role="combobox"
          aria-expanded="false"
          placeholder="검색 및 선택"
          value={value}
          data-hs-combo-box-input=""
          onChange={onChange}
        />
        <div
          className="absolute top-1/2 end-3 -translate-y-1/2"
          aria-expanded={true}
          data-hs-combo-box-toggle=""
        >
          <button type='button' className="text-gray-60">▼</button>
        </div>
      </div>
      <div
        className='absolute z-50 w-full hidden max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300'

        data-hs-combo-box-output=""
      >
        {list.map((el, index) => (
          <div
            key={index}
            className="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100"
            tabIndex={index}
            data-hs-combo-box-output-item={el.value}
            onClick={() => onClick && onClick(el.label) }
          >
            <div className="flex justify-between items-center w-full">
              <span
                data-hs-combo-box-search-text={el.value}
                data-hs-combo-box-value={el.value}
              >
                {el.label}
              </span>
              <span className="hidden hs-combo-box-selected:block">
                <svg
                  className="shrink-0 size-3.5 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrComboBox;
