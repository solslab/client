'use server';

import { getAdminToken, getToken } from '@/app/lib/utils/cookie';
import { SPRING_URL } from '@/app/lib/utils/constants';

export async function tokenTest(role: string) {
	try {
		const headers: {
			'Content-Type': string;
			'Cache-Control': string;
			Authorization?: string;
		} = {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-cache'
		};

		let token;
		if (role === 'USER') {
			token = await getToken();
		} else if (role === 'ADMIN') {
			token = await getAdminToken();
		}
		if (!token) return null;

		const value = token.value;
		if (value) {
			headers['Authorization'] = `Bearer ${value}`;
		}

		const response = await fetch(`${SPRING_URL}/auth/check`, {
			method: 'GET',
			headers
		});

		if (!response.ok) throw new Error(`${response.status}`);

		const data = await response.json();
		const newToken = response.headers.get('Authorization');
		if (newToken) data.new_token = newToken;

		return data;
	} catch (error) {
		console.error('tokenTest중 오류발생', error);
		return false;
	}
}
