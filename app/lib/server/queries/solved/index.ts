'use server';

import { findEnglishTierLabel, findTierLabel } from '@/app/lib/utils/helpers';

export type SolvedTierResult =
	| {
			tier: number;
			rating: number;
	  }
	| {
			error: string;
	  };

export async function getSolvedTier(id: string): Promise<SolvedTierResult> {
	if (!id) {
		return { error: '아이디를 입력해주세요.' };
	}

	try {
		const response = await fetch(
			`https://solved.ac/api/v3/user/show?handle=${encodeURIComponent(id)}`
		);

		if (response.status === 404) {
			return { error: '해당하는 사용자를 찾을 수 없습니다.' };
		}

		if (!response.ok) {
			return { error: '티어 정보를 가져오는데 실패했습니다.' };
		}

		const data = await response.json();
		console.log(data, '@@@');

		const { rating, tier } = data;

		if (rating === undefined) {
			return { error: '티어 정보를 찾을 수 없습니다.' };
		}

		return { tier, rating };
	} catch (error) {
		console.error('Error fetching solved.ac data:', error);
		return { error: '티어 정보를 가져오는데 실패했습니다.' };
	}
}
