"use client";

import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";

const links = [
    { name: "내 프로필", href: "/" },
    { name: "설정", href: "/" },
];

export default function ProfileDropdown({ logout }: { logout: () => void }) {
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
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User avatar"
          />
        </button>
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
          {links.map((link) => (
            <Link
            key={link.href + link.name}
              href={link.href}
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="py-1" role="none">
            <button
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
              onClick={()=>logout()}
            >
              로그아웃
            </button>
        </div>
      </div>
    </>
  );
}
