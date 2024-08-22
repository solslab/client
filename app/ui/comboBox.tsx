import React, { useState } from 'react';

const ComboBox = ({list,onClick}:{list:[],onClick:() => void}) => {
    const [value,setValue] = useState('');
    const [visible,setVisible] = useState(false);
    const [sortedList,setSortedList] = useState([]);
    const onChange = (e)=>{
        const sorted = list.filter(item =>   item.toLowerCase().includes(e.target.value.toLowerCase()))
        setValue(e.target.value)
        setSortedList(sorted)
        if(e.target.value.length>0 && sorted.length>0){
            setVisible(true)
        }
        else{
            setVisible(false)
        }
    }
  return (
    <div className="relative" data-hs-combo-box="">
      <div className="relative">
        <input
          className="py-3 ps-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          type="text"
          role="combobox"
          aria-expanded="false"
          value={value}
          data-hs-combo-box-input=""
          onChange={onChange}
        />
        <div className="absolute top-1/2 end-3 -translate-y-1/2" aria-expanded="false" data-hs-combo-box-toggle="">
          <svg
            className="shrink-0 size-3.5 text-gray-500"
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
            <path d="m7 15 5 5 5-5"></path>
            <path d="m7 9 5-5 5 5"></path>
          </svg>
        </div>
      </div>
      <div
        className="absolute z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300"
        style={visible?undefined:{ display: 'none' }}
        data-hs-combo-box-output=""
      >
        {sortedList.map((el, index) => (
          <div
            key={index}
            className="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100"
            tabIndex={index}
            data-hs-combo-box-output-item=""
            onClick={()=>onClick(el)}
          >
            <div className="flex justify-between items-center w-full">
              <span data-hs-combo-box-search-text={el} data-hs-combo-box-value="">{el}</span>
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

export default ComboBox;
