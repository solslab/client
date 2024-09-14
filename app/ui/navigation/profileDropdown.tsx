'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';
import Image from 'next/image';

const links = [{ name: '내 프로필', href: '/profiles' }];

export default function ProfileDropdown({
	userName,
	logout
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
				className="relative hidden rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 sm:flex"
				id="user-menu-button"
				aria-expanded="false"
				aria-haspopup="true"
				onClick={() => handleProfileClicked()}
			>
				<span className="absolute -inset-1.5"></span>
				<span className="sr-only">Open user menu</span>
				<Image width={42} height={42} src="/icons/default_profile.png" alt="menu button" />
			</button>

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
			<div
				onClick={handleProfileClicked}
				className={clsx(`fixed left-0 top-0 h-screen w-screen`, {
					hidden: !profileClicked
				})}
			/>

			<div
				className={clsx(
					`absolute right-0 z-10 mt-2 hidden w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:block`,
					{
						'sm:hidden': !profileClicked
					}
				)}
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="menu-button"
				tabIndex={-1}
			>
				<div className="py-1 sm:block" role="none">
					<div className="py-2" role="none">
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
					</div>
					{links.map((link) => (
						<Link
							key={link.href + link.name}
							href={link.href}
							className="block px-4 py-2 text-sm text-text-base"
							role="menuitem"
							tabIndex={-1}
						><div	onClick={() => handleProfileClicked()}>
							{link.name}
						</div>
						</Link>
					))}
				</div>
				<div className="py-1" role="none">
					<button
						className="block px-4 py-2 text-sm text-text-base"
						role="menuitem"
						tabIndex={-1}
						onClick={() =>{ 
							handleProfileClicked();
							logout()}}
					>
						로그아웃
					</button>
				</div>
			</div>
			<div
				className={clsx(`fixed left-0 top-0 h-full w-full bg-white sm:hidden`, {
					hidden: !profileClicked
				})}
				id="mobile-menu"
			>
				<div className="space-y-2 px-2 pb-3 pt-2 ">
					<div className="h-44 w-full p-6 flex flex-col justify-between">
						<div className='flex justify-between w-full'>
							<Image
								className="rounded-full"
								width={74}
								height={74}
								src="/icons/default_profile.png"
								alt="User avatar"
							/>
							<button onClick={handleProfileClicked} className='w-6 h-6 flex justify-center items-center'>
								<Image width={16} height={16} src="/icons/ex.png" alt="cancel button" />
							</button>
						</div>
						<div className='text-text-base text-xl'>{userName}</div>
					</div>

				</div>
				<div id='' className='w-full bg-gray-10 h-1 my-5' ></div>
				<div >
				{links.map((link,index) => (
						<Link
							key={link.href + link.name}
							href={link.href}

							role="menuitem"
							tabIndex={index}
						>
							<div onClick={handleProfileClicked} className=" px-6 py-4 text-base text-text-base">{link.name}</div>

						</Link>
					))}
					<div id='' className='w-full bg-gray-10 h-0.25 my-2' ></div>
					<button
						className="px-6 py-4 text-base text-text-base"
						role="logOut"
						tabIndex={-1}
						onClick={() => {logout(); handleProfileClicked();}}
					>
						로그아웃
					</button>

				</div>
			</div>
		</>
	);
}
