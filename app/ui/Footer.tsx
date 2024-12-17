'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
	const pathname = usePathname();
	const shouldHideFooter = pathname.startsWith('/company') || pathname.startsWith('/admin');
	const bgClass = shouldHideFooter ? 'hidden' : 'bg-transparent';

	return (
		<footer className={`${bgClass} py-16`}>
			<div className="text-center text-gray-500">2024 © solslab Corp.</div>
		</footer>
	);
}