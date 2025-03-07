export const getTierStyle = (tierText: string | null): React.CSSProperties => {
	if (!tierText) return {};
	const tier = tierText.split('/')[0].trim().toLowerCase();

	if (tier.includes('마스터') || tier.includes('master')) {
		return {
			background:
				'linear-gradient(0deg, rgb(255, 124, 168), rgb(180, 145, 255), rgb(124, 249, 255))',
			WebkitBackgroundClip: 'text',
			WebkitTextFillColor: 'transparent'
		};
	}
	if (tier.includes('루비') || tier.includes('ruby')) return { color: 'rgb(245, 0, 90)' };
	if (tier.includes('다이아') || tier.includes('diamond')) return { color: 'rgb(0, 180, 252)' };
	if (tier.includes('플래티넘') || tier.includes('platinum')) return { color: 'rgb(39, 226, 164)' };
	if (tier.includes('골드') || tier.includes('gold')) return { color: 'rgb(236, 154, 0)' };
	if (tier.includes('실버') || tier.includes('silver')) return { color: 'rgb(151, 151, 151)' };
	if (tier.includes('브론즈') || tier.includes('bronze')) return { color: 'rgb(173, 86, 0)' };
	return { color: 'rgb(45, 45, 45)' };
};
