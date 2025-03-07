type SolvedApiResponse = {
	handle: string;
	bio: string;
	organizations: string[];
	badge: {
		badgeId: string;
		badgeImageUrl: string;
		displayName: string;
		displayDescription: string;
	};
	background: {
		backgroundId: string;
		backgroundImageUrl: string;
		author: string;
		authorUrl: string;
		displayName: string;
		displayDescription: string;
	};
	profileImageUrl: string;
	solvedCount: number;
	voteCount: number;
	class: number;
	classDecoration: string;
	tier: number;
	rating: number;
	ratingByProblemsSum: number;
	ratingByClass: number;
	ratingBySolvedCount: number;
	ratingByVoteCount: number;
	maxStreak: number;
	rank: number;
	globalRank: number;
	rivalCount: number;
	reverseRivalCount: number;
	maxRating: number;
	minRating: number;
	streakCount: number;
	codeforcesHandle: string;
	previousTiers: {
		timestamp: number;
		tier: number;
	}[];
	contribution: number;
	providerExists: boolean;
};

type CrawlErrorResult = {
	error: string;
};

export async function crawlSolvedTier(id: string): Promise<SolvedApiResponse | CrawlErrorResult> {
	try {
		const response = await fetch(`/api/solved?id=${encodeURIComponent(id)}`);
		const data = await response.json();

		if ('error' in data) {
			return { error: data.error };
		}

		return data;
	} catch (error) {
		return { error: '티어 정보를 가져오는데 실패했습니다.' };
	}
}
