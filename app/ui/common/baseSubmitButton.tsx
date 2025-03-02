"use client";
import clsx from "clsx";

export default function BaseSubmitButton({
  text,
  active,
}: {
  text?: string;
  active?: boolean;
}) {
  const btnText = text || "확인";
  const isActive = active ?? true;

  return (
    <button
      type="submit"
      className={clsx(
        `w-full py-3 rounded-xl  text-text-base cursor-default bg-gray-10  text-xl font-bold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
        {
          "bg-main-base text-white cursor-pointer": isActive,
        }
      )}
    >
      {btnText}
    </button>
  );
}
