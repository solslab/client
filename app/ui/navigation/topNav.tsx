'use client';

import Image from 'next/image';
import Link from 'next/link';
import NavBtn from './navBtn';
import InteractiveLink from './InteractiveLink';
import { usePathname } from 'next/navigation';
import { useIsAdminDomain } from '@/app/lib/hooks/useIsAdminDomain';
import { useEffect, useState } from 'react';

export default function Topnav() {
	const [isMounted, setIsMounted] = useState(false);
	const isAdminDomain = useIsAdminDomain();
	const isAdminPage = usePathname().startsWith('/admin') || isAdminDomain;

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;
	if (isAdminPage) return null;

	return (
		<nav className="fixed top-0 z-40 w-full bg-white shadow">
			<div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="flex flex-1 items-stretch justify-start">
						<Link href="/" className="flex flex-shrink-0 items-center">
							<Image
								width={42}
								height={32}
								className="hidden sm:block"
								src="/icons/logo_light.png"
								alt="몇솔"
							/>
							<Image
								width={48}
								height={48}
								className="block h-auto w-auto sm:hidden"
								src="/icons/mobile_logo.png"
								alt="몇솔"
							/>
						</Link>
						<div className="hidden sm:ml-6 sm:block md:ml-32">
							<div className="flex space-x-4">
								<InteractiveLink href="/company">전체 기업</InteractiveLink>
							</div>
						</div>
					</div>
					<NavBtn />
				</div>
			</div>
		</nav>
	);
}
