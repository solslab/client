"use client";
import Image from "next/image";
import { useState } from "react";
import FeedBackModal from "./feedBackModal";

export default function FeedBackBtn() {
  const [active, setActive] = useState(false);

  return (
    <div className="hidden lg:block fixed left-10 bottom-6">
      {
        active?
        <FeedBackModal setVisible={setActive}/>
        :
        <div className=" flex flex-col items-center">
          <button
          onClick={()=>setActive(true)}
            type="button"
            className="w-28 h-28 bg-light-blue rounded-full shadow-customShadow flex justify-center items-center "
          >
            <Image
              src="/icons/gradient_clover.png"
              width={36}
              height={36}
              alt="feedback button"
              className="h-auto w-auto"
            />
          </button>
          <div className="my-4  bg-gradient-text-2 text-center text-transparent bg-clip-text font-bold">
            피드백 남기기
          </div>
        </div>
      }
    </div>
  );
}
