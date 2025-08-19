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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
		<div
			className={clsx('relative flex items-center', { 'w-4/5': isOfficial, 'w-full': !isOfficial })}
		>
			<Select onValueChange={(value) => handleChange(value)} value={selected}>
				<SelectTrigger
					className={clsx(
						'rounded-lg border border-gray-30 text-sm text-text-base shadow-customShadow',
						{
							'w-11/12': isOfficial,
							'w-full': !isOfficial
						}
					)}
				>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{positions.map((position) => (
						<SelectItem value={position.position_id} key={position.position_id}>
							{position.position_name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			{isOfficial && (
				<div
					className="absolute top-1/2 w-full -translate-y-1/2 transform sm:hidden"
					style={{ left: 'calc(90% + 20px)' }}
				>
					<Image src={'/icons/verifyIcon.png'} width={18} height={18} alt="verified" />
				</div>
			)}
		</div>
	);
}
