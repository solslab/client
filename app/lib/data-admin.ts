'use server';

import { permanentRedirect, redirect } from 'next/navigation';
import { NEXT_URL, SPRING_URL } from './constants';
import { deleteToken, getToken, updateToken } from './cookie';
import {
	Company,
	CompanyOverviewData,
	CompanyPageResponse,
	CompanyQuery,
	DataLabDetail
} from './definitions';

export const loginAdmin = async (email: string, password: string): Promise<any> => {
	try {
		const response = await fetch(`${SPRING_URL}/admin/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		});

		if (response.status == 404) {
			return {
				status: 404,
				message: '존재하지 않는 관리자 이메일입니다.'
			};
		} else if (response.status == 401) {
			return {
				status: 401,
				message: '이메일 혹은 비밀번호가 잘못되었습니다. 정확히 입력해주세요.'
			};
		}

		return {
			status: 200,
			data: await response.json()
		};
	} catch (error) {
		console.error('로그인 중 에러 발생:', error);
	}
};