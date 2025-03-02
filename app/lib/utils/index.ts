interface PlatformData {
	platform: string | null;
	label: string | null;
}

export function findPlatformAndLabel(platform: string, tier: string): PlatformData | undefined {
	if (!platform || !tier) {
		return undefined;
	}

	return {
		platform: platform,
		label: tier
	};
}
