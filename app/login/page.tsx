"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  // const router = useRouter()
  // const pathName = usePathname();
  // useEffect(() => {
  //   const previousPath = document.referrer;
  //   console.log(previousPath)
  //   if (previousPath) {
  //     updateLastRoute(previousPath);
  //   }
  // }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          width={300}
          height={300}
          className="mx-auto"
          src="/logoExam.png"
          alt="Sols"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"></h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <Link
            href="http://13.124.196.95:8080/oauth2/authorization/kakao"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            카카오로 시작하기
          </Link>
        </div>
      </div>
    </div>
    </main>
  );
}
