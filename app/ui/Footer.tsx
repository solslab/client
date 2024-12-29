'use client';

import { usePathname } from 'next/navigation';
import { useIsAdminDomain } from '@/hooks/useIsAdminDomain';

export default function Footer() {
	const pathname = usePathname();
	const bgClass = pathname.startsWith('/company') ? 'bg-bg-base' : 'bg-transparent';
	const isAdminPage = pathname.startsWith('/admin') || useIsAdminDomain;

	return (
		<>
			{!isAdminPage && (
				<footer className={`${bgClass} py-16`}>
					<div className="text-center text-gray-500">2024 © solslab Corp.</div>
				</footer>
			)}
		</>
	);
}
