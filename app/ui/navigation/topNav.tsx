'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProfileDropdown from './profileDropdown';
import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { readToken } from '@/app/lib/cookie';
import { logOut } from '@/app/lib/auth';
import { fetchProfile } from '@/app/lib/data';
import NavSearchBox from './navSearchBox';
import MobileNavSearchBox from './mobileNavSearchBox';

const exception = ['/company'];

export default function Topnav() {
	const router = useRouter();
	const pathName = usePathname();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);
	const [userName, setUserName] = useState('');

	const logout = async () => {
		await logOut(pathName);
		setIsLoggedIn(false);
	};
	useEffect(() => {
		async function checkToken() {
			const cookieExist = await readToken();
			if (cookieExist) {
				const profile = await fetchProfile();
				setIsLoggedIn(true);
				// setUserName('plc');
			} else {
				setIsLoggedIn(false);
			}
			setLoading(false);
		}

		checkToken();
	}, []);

	return (
		<>
			<nav className="fixed z-50 w-full bg-white shadow">
				<div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
							{/* <button
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
                </button> */}
						</div>
						<div className="flex flex-1 items-stretch justify-start">
							<Link href="/" className="flex flex-shrink-0 items-center">
								<Image
									width={58}
									height={32}
									className="hidden h-auto w-auto sm:block"
									src="/icons/logo_light.png"
									alt="Sols"
								/>
								<Image
									width={48}
									height={48}
									className="block h-auto w-auto sm:hidden"
									src="/icons/mobile_logo.png"
									alt="Sols"
								/>
							</Link>
							{/* <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link
                      href="/company/naver"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-black"
                    >
                      Naver
                    </Link>
                  </div>
                </div> */}
						</div>
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							<MobileNavSearchBox />
							<NavSearchBox />
							<div className="relative ml-3">
								{loading ? (
									<></>
								) : isLoggedIn ? (
									<ProfileDropdown userName={userName} logout={logout} />
								) : (
									<Link
										className="rounded-3xl border border-gray-40 px-5 py-2 text-sm font-medium text-text-base hover:text-black"
										href="/login"
									>
										로그인 / 회원가입
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}
