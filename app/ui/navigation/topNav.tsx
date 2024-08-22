"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import ProfileDropdown from "./profileDropdown";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { set } from "zod";
import { deleteToken, readToken, reload, updateLastRoute } from "@/app/lib/cookie";

const exception = ["/login"];

export default function Topnav() {
  const router = useRouter();
  const pathName = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [visible, setVisible] = useState(true);
  const logout = async () => {
    await deleteToken();
    setIsLoggedIn(false);
    // await reload(pathName);
  };

  useEffect(() => {
    async function checkToken() {
      const cookieExist = await readToken();
      if (cookieExist) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
    checkToken();

    if (exception.includes(pathName)) {
      setVisible(false);
    } else {
      setVisible(true);
      updateLastRoute(pathName)
    }

  }, [pathName]); // 라우트가 변경될 때마다 실행

  return (
    <>
      {visible ? (
        <nav className="fixed w-full bg-white border-b-2 z-50">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                  <svg
                    className="hidden h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link href="/" className="flex flex-shrink-0 items-center">
                  <Image
                    width={100}
                    height={100}
                    className="h-8 w-auto"
                    src="/logoExam.png"
                    alt="Sols"
                  />
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link
                      href="/company/naver"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-black"
                    >
                      Naver
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button> */}
                <div className="relative ml-3">
                  {isLoggedIn ? (
                    <ProfileDropdown logout={logout} />
                  ) : (
                    <Link
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-black "
                      href="/login"
                    >
                      로그인 / 회원가입
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="sm:hidden" id="mobile-menu">
            {/* <div className="space-y-1 px-2 pb-3 pt-2">
        <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Dashboard</a>
        <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a>
        <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
        <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
      </div> */}
          </div>
        </nav>
      ) : (
        <></>
      )}
    </>
  );
}
