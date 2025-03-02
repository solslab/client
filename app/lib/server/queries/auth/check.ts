'use server';

import { redirect } from 'next/navigation';
import { getToken } from '@/app/lib/utils/cookie';
import { SPRING_URL } from '@/app/lib/utils/constants';

export async function infoCheck(tokenParam?: string) {
	try {
		const headers: { 'Content-Type': string; 'Cache-Control': string; Authorization?: string } = {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-cache'
		};

		const token = await getToken();
		const value = tokenParam || token?.value;
		if (!value) {
			return false;
		}

		if (value) {
			headers['Authorization'] = `Bearer ${value}`;
		}
		const response = await fetch(`${SPRING_URL}/member/info-check`, {
			method: 'GET',
			headers: headers
		});
		if (!response.ok) {
			throw new Error(`${response.status}`);
		}
		const data = await response.json();
		if (data.status == 'complete') {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error('infoCheck중 오류발생', error);
		return false;
	}
}
