'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { logOut, tokenTest } from '@/app/lib/auth';
import { usePathname } from 'next/navigation';

const links = [{ name: '내 프로필', href: '/profiles' }];

export default function ProfileDropdown({
	userName,
	visible
}: {
	userName: string;
	visible: boolean;
}) {
	const pathName = usePathname();
	const [profileClicked, setProfileClicked] = useState(false);
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const logout = async () => {
		await logOut(pathName);
		setIsLoggedIn(false);
	};
	const handleProfileClicked = () => {
		setProfileClicked(!profileClicked);
	};
	useEffect(() => {
		async function checkToken() {
			const cookieExist = await tokenTest();
			if (cookieExist) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
			setLoading(false);
		}
		checkToken();
	}, []);

	return (
		<>
			{loading ? (
				<></>
			) : isLoggedIn ? (
				<>
					{visible ? (
						<button
							type="button"
							className="relative hidden rounded-full text-sm focus:outline-none sm:flex"
							id="user-menu-button"
							aria-expanded="false"
							aria-haspopup="true"
							onClick={() => handleProfileClicked()}
						>
							<span className="absolute -inset-1.5"></span>
							<span className="sr-only">Open user menu</span>
							<Image width={42} height={42} src="/icons/default_profile.png" alt="menu button" />
						</button>
					) : (
						<button
							type="button"
							className="relative flex text-sm sm:hidden"
							id="user-menu-button"
							aria-expanded="false"
							aria-haspopup="true"
							onClick={() => handleProfileClicked()}
						>
							<span className="absolute -inset-1.5"></span>
							<span className="sr-only">Open user menu</span>
							<Image width={24} height={24} src="/icons/hamburger.png" alt="User avatar" />
						</button>
					)}

					<div
						onClick={handleProfileClicked}
						className={clsx(`fixed left-0 top-0 h-screen w-screen`, {
							hidden: !profileClicked
						})}
					/>

					{visible ? (
						<div
							className={clsx(
								`absolute right-0 z-10 mt-2 hidden w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:block`,
								{
									'sm:hidden': !profileClicked
								}
							)}
							id="desktop menu"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="menu-button"
							tabIndex={-1}
						>
							<div className="py-1 sm:block" role="none">
								{/* <div className="py-2" role="none">
									<div
										className="flex items-center px-4 py-2 text-sm text-gray-700"
										role="menuitem"
										tabIndex={-1}
										id="menu-item-0"
									>
										<Image
											className="rounded-full"
											width={42}
											height={42}
											src="/icons/default_profile.png"
											alt="User avatar"
										/>
										<div className="px-4 text-text-base">{userName}</div>
									</div>
								</div> */}
								{links.map((link) => (
									<Link
										key={link.href + link.name}
										href={link.href}
										className="block px-4 py-2 text-sm text-text-base"
										role="menuitem"
										tabIndex={-1}
									>
										<div onClick={() => handleProfileClicked()}>{link.name}</div>
									</Link>
								))}
							</div>
							<div className="py-1" role="none">
								<button
									className="block px-4 py-2 text-sm text-text-base"
									role="menuitem"
									tabIndex={-1}
									onClick={() => {
										handleProfileClicked();
										logout();
									}}
								>
									로그아웃
								</button>
							</div>
						</div>
					) : (
						<div
							className={clsx(`fixed left-0 top-0 h-full w-full bg-white sm:hidden`, {
								hidden: !profileClicked
							})}
							id="mobile-menu"
						>
							<div className="space-y-2 px-2 pb-3 pt-2">
								<div className="flex w-full flex-col justify-between p-6">
									<div className="flex w-full justify-end">
										{/* <Image
											className="rounded-full"
											width={74}
											height={74}
											src="/icons/default_profile.png"
											alt="User avatar"
										/> */}
										<button
											onClick={handleProfileClicked}
											className="flex h-6 w-6 items-center justify-center"
										>
											<Image width={16} height={16} src="/icons/ex.png" alt="cancel button" />
										</button>
									</div>
									<div className="text-xl text-text-base">{userName}</div>
								</div>
							</div>
							<div id="" className="my-5 h-1 w-full bg-gray-10"></div>
							<div>
								{links.map((link, index) => (
									<Link
										key={link.href + link.name}
										href={link.href}
										role="menuitem"
										tabIndex={index}
									>
										<div
											onClick={handleProfileClicked}
											className="px-6 py-4 text-base text-text-base"
										>
											{link.name}
										</div>
									</Link>
								))}
								<div id="" className="my-2 h-0.25 w-full bg-gray-10"></div>
								<button
									className="px-6 py-4 text-base text-text-base"
									role="logOut"
									tabIndex={-1}
									onClick={() => {
										logout();
										handleProfileClicked();
									}}
								>
									로그아웃
								</button>
							</div>
						</div>
					)}
				</>
			) : (
				<Link
					className="rounded-3xl border border-gray-40 px-6 py-2 text-sm font-medium text-text-base hover:text-black"
					href="/login"
				>
					로그인 / 회원가입
				</Link>
			)}
		</>
	);
}
