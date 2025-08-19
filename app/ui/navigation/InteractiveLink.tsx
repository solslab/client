'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function InteractiveLink({
	href,
	children
}: {
	href: string;
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const isActive = pathname === href;
	return (
		<Link
			href={href}
			className={`rounded-md px-3 py-2 text-base ${isActive ? 'font-medium text-main-base' : 'text-black hover:text-main-base'}`}
		>
			{children}
		</Link>
	);
}
