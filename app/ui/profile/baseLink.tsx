'use client';

import { Button } from '@/app/ui/shadcn/components/ui/button';
import Link from 'next/link';

interface BaseLinkProps {
	text?: string;
	href: string;
}

export default function BaseLink({ text, href }: BaseLinkProps) {
	const btnText = text || '확인';

	return (
		<Link href={href} className="block w-full">
			<Button className="w-full bg-main-base text-white" variant="ghost">
				{btnText}
			</Button>
		</Link>
	);
}
