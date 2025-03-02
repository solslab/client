'use server';

import { User } from '@/app/lib/types/models';
import { SPRING_URL } from '@/app/lib/utils/constants';
import { deleteAdminToken, getAdminToken } from '@/app/lib/utils/cookie';

export const getMemberDetails = async (memberKey: string): Promise<any> => {
	try {
		const token = await getAdminToken();
		const response = await fetch(`${SPRING_URL}/member/${memberKey}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token?.value}`
			}
		});
		if (response.ok) {
			const data: User = await response.json();
			return data;
		} else if (response.status === 401) {
			if (token?.value) {
				deleteAdminToken();
			}
			return {
				status: 401,
				message: '토큰이 만료되었습니다. 다시 로그인하세요.'
			};
		} else {
			const errorData = await response.json();
			return {
				status: response.status,
				message: errorData.message || '알 수 없는 오류가 발생했습니다.'
			};
		}
	} catch (error) {
		console.error('회원 상세조회 중 오류 발생:', error);
		return {
			status: 500,
			message: '회원 상세조회 중 알 수 없는 오류가 발생했습니다.'
		};
	}
};
