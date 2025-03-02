'use server';
import { Profile } from '@/app/lib/types/models/user';
import { deleteToken, getToken, updateToken } from '@/app/lib/utils/cookie';
import { SPRING_URL } from '@/app/lib/utils/constants';
export const fetchProfile = async () => {
	const headers: { 'Content-Type': string; 'Cache-Control'?: string; Authorization?: string } = {
		'Content-Type': 'application/json'
	};
	const token = await getToken();
	const value = token?.value;

	if (value) {
		headers['Authorization'] = `Bearer ${value}`;
	}

	try {
		const response = await fetch(`${SPRING_URL}/member`, {
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
		console.log(data, '@@@data');
		return data;
	} catch (error) {
		console.error('fetchProfile중 에러발생', error);
		// redirect('/login')
	}
};
