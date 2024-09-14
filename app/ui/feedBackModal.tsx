"use client";
import Image from "next/image";
import Input from "./input";
import { Dispatch, SetStateAction, startTransition, useActionState, useState } from "react";
import { FeedBackState, createFeedBack } from "../lib/actions";
import clsx from "clsx";
const STARS = [
  { active: false, value: 1 },
  { active: false, value: 2 },
  { active: false, value: 3 },
  { active: false, value: 4 },
  { active: false, value: 5 },
];

export default function FeedBackModal({setVisible}:{setVisible:Dispatch<SetStateAction<boolean>>}) {
  const [rating, setRating] = useState(0);
  const [active, setActive] = useState(0);
  const initialState: FeedBackState = {
    message: null,
    errors: {},
    fullfiled: {
      value:false,
    }
  };
  const [state, formAction] = useActionState(createFeedBack, initialState);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("rating", rating.toString());

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="z-50 ">
      <div className={clsx(`max-w-512  text-text-base rounded-xl shadow-lg relative`,
        {
          "bg-white text-text-base border border-gray-50":state.fullfiled?.value==false,
          "bg-green-success text-white":state.fullfiled?.value==true&&state.fullfiled?.status==true,
          "bg-red-warning text-white":state.fullfiled?.value==true&&state.fullfiled?.status==false,

        }
      )}>
        <button onClick={()=>setVisible(false)} className="absolute top-4 right-4">
        <Image src={state.fullfiled?.value==false?'/icons/ex.png':'/icons/ex_white.png'} width={14} height={14} alt='ex'/>
        </button>


        {!state.fullfiled?.value==true?
        <div className="px-16  pt-10 pb-2 ">
          <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
            <div className="text-2xl font-bold pb-4">몇솔에 만족하셨나요?</div>
            <div className="text-base font-semibold ">
              더 나은 서비스 제공을 위해 평가를 남겨주세요!
            </div>
            <div className="pt-10 pb-2">
              <div className="flex">
                {STARS.map((star, index) => (
                  <Image
                    className="px-2"
                    key={star.value}
                    onMouseEnter={() => setActive(star.value)}
                    onMouseLeave={() => setActive(rating)}
                    onClick={() => {
                      setRating(star.value);
                      setActive(star.value);
                    }}
                    src={
                      active >= star.value ? "/yellowStar.png" : "/grayStar.png"
                    }
                    alt="star"
                    width={60}
                    height={60}
                  />
                ))}
              </div>
              <div className="py-2 h-8 ">
                {state.errors?.rating &&
                  state.errors.rating.map((error: string) => (
                    <p className="text-sm text-red-500 text-center" key={error}>
                      {error}
                    </p>
                  ))}

                  
              </div>
            </div>

            <div className="flex w-full justify-center items-center">
              <Input
                id="feedback_content"
                name="feedback_content"
                placeHolder="평가 내용 입력(선택)"
              />
              <button
                type="submit"
                className="ml-2 w-24 h-9 rounded-lg text-main-base cursor-pointer bg-main-light text-base font-semibold "
              >
                제출
              </button>
            </div>
            <div className="py-2 h-8 ">
            {state.errors?.feedback_content &&
                  state.errors?.feedback_content.map((error: string) => (
                    <p className="text-sm text-red-500 text-center" key={error}>
                      {error}
                    </p>
                  ))}
            </div>

          </form>
          </div>
          :
          <div className="px-16  py-10 ">
            {state.message}
          </div>
        }
        
      </div>
    </div>
  );
}
