export interface User {
	name: string;
	email: string;
	member_tier: number;
	prefer_languages: string[];
	prefer_positions: string[];
	prefer_industries: string[];
	social_type: string;
	al_platform: string;
	nickname: string;
}

export interface Profile {
	name: string;
	nickname: string;
	email: string;
	al_platform: string;
	member_tier: string;
	prefer_languages: string[];
	prefer_industries: string[];
	social_type: string;
	created_date: string;
}

export interface UserUpdateField {
	member_tier?: number;
	prefer_languages?: string[];
	prefer_positions?: string[];
	prefer_industries?: string[];
}
