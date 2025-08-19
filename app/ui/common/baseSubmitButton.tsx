'use client';
import clsx from 'clsx';

export default function BaseSubmitButton({ text, active }: { text?: string; active?: boolean }) {
	const btnText = text || '확인';
	const isActive = active ?? true;

	return (
		<button
			type="submit"
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
