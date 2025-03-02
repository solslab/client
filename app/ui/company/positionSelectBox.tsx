'use client';

import { Position } from '@/app/lib/types/models';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/app/ui/shadcn/components/ui/select';
import clsx from 'clsx';
import Image from 'next/image';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function PositionSelectBox({
	positions,
	selected,
	isOfficial
}: {
	positions: Position[];
	selected: string;
	isOfficial: boolean;
}) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	const createPageURL = (position: string) => {
		const params = new URLSearchParams(searchParams);
		params.set('position', position);
		return `${pathname}?${params}`;
	};

	const handleChange = (value: string) => {
		router.push(createPageURL(value));
	};
	return (
		<Select onValueChange={(value) => handleChange(value)} value={selected}>
			<SelectTrigger
				className={clsx(
					'rounded-lg border border-gray-30 text-sm text-text-base shadow-customShadow',
					{
						'w-3/4': isOfficial,
						'w-full': !isOfficial
					}
				)}
			>
				<SelectValue />
				{isOfficial && (
					<div className="absolute right-10 top-1/2 flex -translate-y-1/2 transform sm:hidden">
						<Image src={'/icons/verifyIcon.png'} width={18} height={18} alt="verifyed" />
					</div>
				)}
			</SelectTrigger>
			<SelectContent>
				{positions.map((position) => (
					<SelectItem value={position.position_id} key={position.position_id}>
						{position.position_name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
