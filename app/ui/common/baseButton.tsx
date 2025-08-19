'use client';
import clsx from 'clsx';

export default function BaseButton({
	text,
	active,
	onClick
}: {
	text?: string;
	active?: boolean;
	onClick: () => void;
}) {
	const btnText = text || '확인';
	const isActive = active ?? true;
	const activeOnClick = isActive ? onClick : undefined;

	return (
		<button
			type="button"
			onClick={() => activeOnClick && activeOnClick()}
			className={clsx(
				`w-full cursor-default rounded-xl bg-gray-10 py-3 text-xl font-bold text-text-base shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
				{
					'cursor-pointer bg-main-base text-white': isActive
				}
			)}
		>
			{btnText}
		</button>
	);
}
