'use server';

import { SPRING_URL } from '@/app/lib/utils/constants';
import { deleteToken, getToken, updateToken } from '@/app/lib/utils/cookie';
import { Company, CompanyPageResponse, CompanyQuery, TestData } from '@/app/lib/types/models';
import { cookies } from 'next/headers';

export const fetchRandomCompany = async (): Promise<CompanyQuery[] | null> => {
	try {
		const response = await fetch(`${SPRING_URL}/company/home-random`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			next: {
				revalidate: 60 * 60 * 3
			}
		});
		if (!response.ok) {
			throw new Error(`${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('fetchRandomCompany중 오류 발생:', error);
		return null;
	}
};
export const fetchCompanyData = async (
	page: number,
	size: number
): Promise<CompanyPageResponse | undefined> => {
	try {
		const response = await fetch(`${SPRING_URL}/company?page=${page}&size=${size}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			next: {
				revalidate: 60 * 60 * 3
			}
		});

		if (!response.ok) {
			throw new Error(`오류 발생: ${response.status}`);
		}

		const data: CompanyPageResponse = await response.json();
		return data;
	} catch (error) {
		console.error('fetchCompanyData중 오류 발생:', error);
		return undefined;
	}
};

export const fetchFilteredCompanys = async (query: string) => {
	try {
		const response = await fetch(`${SPRING_URL}/company/search?q=${query}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`오류 발생: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('fetchFilteredCompanys중 오류 발생:', error);
	}
};
export const fetchFiltereAllCompanys = async (query: string) => {
	try {
		const response = await fetch(`${SPRING_URL}/company/searchAll?q=${query}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`오류 발생: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('fetchFilteredAllCompanys중 오류 발생:', error);
	}
};

export const fetchAllCompanies = async () => {
	try {
		const response = await fetch(`${SPRING_URL}/company/ids`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`오류 발생: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('fetchAllCompanys중 오류 발생:', error);
	}
};

export const fetchCompanyDetail = async (id: string): Promise<Company | undefined> => {
	try {
		const response = await fetch(`${SPRING_URL}/company/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			cache: 'force-cache'
		});

		// 모든 헤더 출력

		if (!response.ok) {
			throw new Error(`${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('fetchCompanyDetail중 오류 발생:', error);
		return undefined;
	}
};

export const fetchPublicPositionData = async (id: string): Promise<TestData | undefined> => {
	try {
		const response = await fetch(`${SPRING_URL}/dev/testInfo/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			cache: 'force-cache'
		});

		// 모든 헤더 출력

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('fetchPublicPositionData중 오류 발생:', error);
		return undefined;
	}
};

export const fetchPositionData = async (id: string) => {
	const headers: { 'Content-Type': string; Authorization?: string } = {
		'Content-Type': 'application/json'
	};
	const token = await getToken();
	const value = token?.value;
	if (value) {
		headers['Authorization'] = `Bearer ${value}`;
	}

	try {
		const response = await fetch(`${SPRING_URL}/tab/testInfo/${id}`, {
			method: 'GET',
			headers: headers
		});

		if (!response.ok) {
			throw new Error(`${response.status}`);
		}

		const newToken = response.headers.get('Authorization');
		if (newToken) {
			updateToken(newToken);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('fetchPositionData중 오류 발생:', error);
	}
};
