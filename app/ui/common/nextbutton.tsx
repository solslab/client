import clsx from 'clsx';

export default function NextButton({
	text,
	active,
	onClick
}: {
	text?: string;
	active?: boolean;
	onClick: () => void;
}) {
	const btnText = text || '다음';
	const isActive = active ?? true;
	const activeOnClick = isActive ? onClick : undefined;

	return (
		<button
			type="submit"
			onClick={() => activeOnClick && activeOnClick()}
			className={clsx(
				`h-10 w-28 cursor-default rounded-2xl bg-gray-10 text-xl font-bold text-text-base shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
				{
					'cursor-pointer bg-main-base text-white': isActive
				}
			)}
		>
			{btnText}
		</button>
	);
}
