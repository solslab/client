"use client";

import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";
import Image from "next/image";

const links = [{ name: "내 프로필", href: "/profiles" }];

export default function ProfileDropdown({
  userName,
  logout,
}: {
  userName: string;
  logout: () => void;
}) {
  const [profileClicked, setProfileClicked] = useState(false);
  const handleProfileClicked = () => {
    setProfileClicked(!profileClicked);
  };
  return (
    <>
      <button
        type="button"
        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 "
        id="user-menu-button"
        aria-expanded="false"
        aria-haspopup="true"
        onClick={() => handleProfileClicked()}
      >
        <span className="absolute -inset-1.5"></span>
        <span className="sr-only">Open user menu</span>
        <Image
          className="h-8 w-8 rounded-full"
          width={12}
          height={12}
          src="/icons/default_profile.png"
          alt="User avatar"
        />
      </button>
      <div
      onClick={handleProfileClicked}
        className={clsx(
          `w-screen h-screen fixed top-0 left-0`,
          {
            hidden: !profileClicked,
          }
        )}
      />
      <div
        className={clsx(
          `absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`,
          {
            hidden: !profileClicked,
          }
        )}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div className="py-1" role="none">
          <div className="py-2" role="none">
            <div
              className="flex items-center px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              <Image
          className=" rounded-full"
          width={42}
          height={42}
          src="/icons/default_profile.png"
          alt="User avatar"
        />
        <div className="px-4 text-text-base">{userName}</div>
              
            </div>
          </div>
          {links.map((link) => (
            <Link
              key={link.href + link.name}
              href={link.href}
              className="block px-4 py-2 text-sm text-text-base"
              role="menuitem"
              tabIndex={-1}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="py-1" role="none">
          <button
            className="block px-4 py-2 text-sm text-text-base"
            role="menuitem"
            tabIndex={-1}
            onClick={() => logout()}
          >
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
}
