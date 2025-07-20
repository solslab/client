'use server';

import { redirect } from 'next/navigation';
import { deleteToken, getAdminToken, getToken, updateToken } from '@/app/lib/utils/cookie';
import { SPRING_URL, NEXT_URL } from '@/app/lib/utils/constants';
import { NextResponse } from 'next/server';
import { DeletionState } from '@/app/lib/types/actions/auth';
import { cookies } from 'next/headers';
import { getDateOneMonthLater } from '@/app/lib/utils/helpers';

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
			message: '탈퇴가 정상적으로 완료되지 않았습니다.',
			fullfiled: false
		};
	}
}

export async function handleKakaoLogin(code: string, redirectUri: string) {
	try {
		const response = await fetch(`${SPRING_URL}/auth/kakao`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ code, redirectUri })
		});

		const data = await response.json();

		if (!response.ok) {
			console.error('Backend login failed:', data);
			return { success: false, error: 'backend', message: '서버 오류가 발생했습니다.' };
		}

		// 성공 시 쿠키 설정
		if (data.access_token) {
			cookies().set('sols-accessToken', data.access_token, {
				httpOnly: true,
				secure: true,
				expires: getDateOneMonthLater()
			});
		}

		return { success: true, data };
	} catch (error) {
		console.error('카카오 로그인 에러:', error);
		return { success: false, error: 'unknown', message: '알 수 없는 오류가 발생했습니다.' };
	}
}


