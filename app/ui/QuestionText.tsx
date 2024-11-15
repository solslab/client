type QuestionTextProps = {
	type?: 'tier' | 'count';
	value?: number | string;
};

function QuestionText({ type = 'tier', value }: QuestionTextProps) {
	const getTierText = (tier?: number) => {
		if (!tier) return '???';
		if (tier === 0) return '언랭크';

		const tierLevel = Math.floor((tier - 1) / 5);
		const subLevel = 5 - ((tier - 1) % 5);

		const tierNames = ['브론즈', '실버', '골드', '플래티넘', '다이아몬드', '루비'];
		const tierName = tierNames[tierLevel];

		return tierName ? `${tierName} ${subLevel}` : '???';
	};

	const displayText = type === 'tier' ? getTierText(value as number) : value?.toString() || '???';

	return (
		<span className="w-fit rounded-[10px] bg-main-light px-2 py-1 text-[14px] font-bold text-main-base">
			{displayText}
		</span>
	);
}

export default QuestionText;
