'use server';

import { redirect } from 'next/navigation';
import { deleteToken, getAdminToken, getToken, updateToken } from '@/app/lib/utils/cookie';
import { SPRING_URL } from '@/app/lib/utils/constants';
import { DeletionState } from '@/app/lib/types/actions/auth';

export async function logOut(path: string) {
	try {
		const headers: { 'Content-Type': string; 'Cache-Control': string; Authorization?: string } = {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-cache'
		};
		const token = await getToken();
		if (!token) {
			redirect(path);
		}
		const value = token?.value;
		if (value) {
			headers['Authorization'] = `Bearer ${value}`;
		}
		const response = await fetch(`${SPRING_URL}/auth/logout`, {
			method: 'DELETE',
			headers: headers
		});
		if (!response.ok) {
			throw new Error(`${response.status}`);
		}
		await deleteToken();
	} catch (error) {
		console.error('logOut중 오류발생', error);
	} finally {
		redirect(path);
	}
}

export async function deleteMember(prevState: DeletionState, formData: FormData) {
	const headers: { 'Content-Type': string; 'Cache-Control': string; Authorization?: string } = {
		'Content-Type': 'application/json',
		'Cache-Control': 'no-cache'
	};
	const token = await getToken();
	if (!token) {
		return {
			submitted: true,
			message: '탈퇴가 정상적으로 완료되지않았습니다.',
			fullfiled: false
		};
	}
	const value = token?.value;
	if (value) {
		headers['Authorization'] = `Bearer ${value}`;
	}

	try {
		const response = await fetch(`${SPRING_URL}/member`, {
			method: 'DELETE',
			headers: headers
		});

		if (!response.ok) {
			const res = await response.text();
			throw new Error(`${response.status}`);
		}
		await deleteToken();
		return {
			submitted: true,
			message: '탈퇴가 완료되었습니다.',
			fullfiled: true
		};
	} catch (error) {
		console.error('deleteMember중 오류발생', error);
		return {
			submitted: true,
			message: '탈퇴가 정상적으로 완료되지않았습니다.',
			fullfiled: false
		};
	}
}
