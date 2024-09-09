"use client";
import clsx from "clsx";
import Link from "next/link";

export default function BaseLink({
  text,
  active,
  href,
}: {
  text?: string;
  active?: boolean;
  href: string;
}) {
  const btnText = text || "확인";
  const isActive = active ?? true;

  return (
    <Link href={href}>
      <div className=" bg-main-base w-full py-3 rounded-3xl  text-white text-center cursor-pointer text-xl font-bold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {btnText}
      </div>
    </Link>
  );
}
