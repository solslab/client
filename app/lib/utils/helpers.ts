import { PLATFORMLIST, SOLVEDACLEVEL, SPRING_URL } from './constants';
import clsx from 'clsx';

export const cn = (...classes: (string | undefined | false)[]) => {
	return clsx(...classes);
};

export function findTierLabel(value: number): { label: string } | undefined {
	for (const item of SOLVEDACLEVEL.level) {
		if (item.value === value) {
			return { label: item.label };
		}
	}
	return undefined;
}

export function findEnglishTierLabel(value: number): { label: string } | undefined {
	for (const item of SOLVEDACLEVEL.englishLevel) {
		if (item.value === value) {
			return { label: item.label };
		}
	}
	return undefined;
}

export const findPlatformIndex = (code: string) => {
	const platformIndex = PLATFORMLIST.findIndex((platform) => platform.code === code);

	if (platformIndex === -1) {
		return null; // 플랫폼이 없을 경우
	}

	return platformIndex;
};
export const getTierValue = (tierName: string): number => {
	// 티어 이름에서 숫자와 티어 등급 추출
	const cleanTierName = tierName.toLowerCase().trim();

	// unrated 처리
	if (cleanTierName.includes('unrated')) {
		return 0;
	}

	// 영어 티어 처리
	const englishTier = SOLVEDACLEVEL.englishLevel.find(
		(level) => level.label.toLowerCase() === cleanTierName
	);
	if (englishTier) {
		return englishTier.value;
	}

	// 한글 티어 처리
	const koreanTier = SOLVEDACLEVEL.level.find(
		(level) => level.label.toLowerCase() === cleanTierName
	);
	if (koreanTier) {
		return koreanTier.value;
	}

	// 부분 매칭 시도 (영어)
	for (const level of SOLVEDACLEVEL.englishLevel) {
		const [tier, number] = level.label.toLowerCase().split(' ');
		if (cleanTierName.includes(tier) && (!number || cleanTierName.includes(number))) {
			return level.value;
		}
	}

	// 부분 매칭 시도 (한글)
	for (const level of SOLVEDACLEVEL.level) {
		const [tier, number] = level.label.toLowerCase().split(' ');
		if (cleanTierName.includes(tier) && (!number || cleanTierName.includes(number))) {
			return level.value;
		}
	}

	return 0;
};

export const getDateOneMonthLater = (): Date => {
	const currentDate = new Date();
	const oneMonthLater = new Date(currentDate);

	// 현재 날짜에 1개월을 더합니다.
	oneMonthLater.setMonth(currentDate.getMonth() + 1);

	return oneMonthLater;
};
