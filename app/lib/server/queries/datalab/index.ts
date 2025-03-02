import { DataLabDetail } from '@/app/lib/types/models';
import { SPRING_URL } from '@/app/lib/utils/constants';
import { deleteToken, getToken } from '@/app/lib/utils/cookie';

export const fetchDatalabData = async (id: string) => {
	const headers: { 'Content-Type': string; 'Cache-Control'?: string; Authorization?: string } = {
		'Content-Type': 'application/json'
	};
	const token = await getToken();
	const value = token?.value;

	if (value) {
		headers['Authorization'] = `Bearer ${value}`;
	}
	try {
		const response = await fetch(`${SPRING_URL}/tab/datalab/${id}`, {
			method: 'GET',
			headers: headers
		});
		if (response.status === 403) {
			return {
				success: 403,
				message: '접근 권한이 없습니다.'
			};
		} else if (response.status === 404) {
			return {
				success: 404,
				message: '데이터가 존재하지 않습니다.'
			};
		} else if (!response.ok) {
			return {
				success: 400,
				message: `요청 처리 중 오류가 발생했습니다: ${response.status}`
			};
		}
		const data: DataLabDetail[] = await response.json();
		return {
			success: 200,
			data: data
		};
	} catch (error) {
		console.error('fetchDatalabData중 에러발생', error);
		deleteToken();
		return {
			success: 400,
			error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
		};
	}
};
