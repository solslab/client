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
            className=""
          >
            <Image
              src="/icons/clover_circle.png"
              width={72}
              height={72}
              alt="feedback button"
              className=""
            />
          </button>
          <div className="my-2  bg-gradient-text-2 text-sm text-center text-transparent bg-clip-text font-bold">
            피드백 남기기
          </div>
        </div>
      }
    </div>
  );
}
