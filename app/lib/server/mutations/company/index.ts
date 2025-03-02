'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { CompanyState } from '@/app/lib/types/actions/company';
import { CompanyData, TestData, TestInfoData } from '@/app/lib/types/models/company';
import { deleteAdminToken, getAdminToken } from '@/app/lib/utils/cookie';
import { SPRING_URL } from '@/app/lib/utils/constants';

export const createCompany = async (companyData: any) => {
	try {
		const token = await getAdminToken();

		const response = await fetch(`${SPRING_URL}/company`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token?.value}` // 쿠키에서 가져온 토큰 사용
			},
			body: JSON.stringify(companyData)
		});

		if (response.status === 200) {
			return await response.json(); // 성공 시 데이터 반환
		} else if (response.status === 409) {
			return {
				status: 409,
				message: '중복된 기업명입니다.'
			};
		} else if (response.status === 400) {
			const errorData = await response.json();
			return {
				status: 400,
				message: errorData.message || '잘못된 필드가 포함되어 있습니다.'
			};
		} else if (response.status === 401) {
			const errorData = await response.json();
			if (token?.value) {
				deleteAdminToken();
			}
			return {
				status: 401,
				message: errorData.message || '토큰이 만료되었습니다. 다시 로그인하세요.'
			};
		} else {
			const errorData = await response.json();
			return {
				status: response.status,
				message: errorData.message || '기업 생성 중 알 수 없는 에러가 발생했습니다.'
			};
		}
	} catch (error) {
		console.error('기업 생성 중 에러 발생:', error);
	}
};
export const updateCompany = async (companyId: string, companyData: any) => {
	try {
		const token = await getAdminToken();

		const response = await fetch(`${SPRING_URL}/company/${companyId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token?.value}`
			},
			body: JSON.stringify(companyData)
		});

		if (response.status === 200) {
			return {
				status: 200,
				message: '기업 수정이 완료되었습니다.'
			};
		} else if (response.status === 404) {
			return {
				status: 404,
				message: '존재하지 않는 기업 ID 입니다.'
			};
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
				message: errorData.message
			};
		}
	} catch (error) {
		return {
			status: 500, // 상태 코드 500을 사용하는 것이 더 명확합니다.
			message: '기업 생성 중 에러 발생: ' + (error instanceof Error ? error.message : String(error))
		};
	}
};

export const deleteCompany = async (companyId: string) => {
	try {
		const token = await getAdminToken();

		const response = await fetch(`${SPRING_URL}/company/${companyId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token?.value}`
			}
		});

		if (response.status === 204) {
			return {
				status: 204,
				message: '기업 삭제가 완료되었습니다.'
			};
		} else if (response.status === 404) {
			return {
				status: 404,
				message: '존재하지 않는 기업 ID 입니다.'
			};
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
				message: errorData.message
			};
		}
	} catch (error) {
		return {
			status: 500,
			message: '기업 생성 중 에러 발생: ' + (error instanceof Error ? error.message : String(error))
		};
	}
};

export const uploadCompanyLogo = async (companyId: string, logoFile: File) => {
	try {
		const token = await getAdminToken();

		const formData = new FormData();
		formData.append('file', logoFile);
		formData.append('fileName', logoFile.name);

		const response = await fetch(`${SPRING_URL}/company/${companyId}/logo`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token?.value}`
			},
			body: formData
		});

		if (response.status === 200) {
			const responseData = await response.json();
			return {
				status: 200,
				message: '로고 등록/변경이 완료되었습니다.',
				data: responseData
			};
		} else if (response.status === 401) {
			if (token?.value) {
				deleteAdminToken();
			}
			return {
				status: 401,
				message: '토큰이 만료되었습니다. 다시 로그인하세요.'
			};
		} else if (response.status === 404) {
			return {
				status: 404,
				message: '존재하지 않는 기업 ID입니다.'
			};
		} else {
			const errorData = await response.json();
			return {
				status: response.status,
				message: errorData.message || '알 수 없는 오류가 발생했습니다.'
			};
		}
	} catch (error) {
		console.error('로고 등록/변경 중 에러 발생:', error);
		return {
			status: 500,
			message: '로고 등록/변경 중 알 수 없는 오류가 발생했습니다.'
		};
	}
};

export const deleteCompanyLogo = async (companyId: string) => {
	try {
		const token = await getAdminToken();

		const response = await fetch(`${SPRING_URL}/company/${companyId}/logo`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token?.value}`
			}
		});

		if (response.status === 204) {
			return {
				status: 204,
				message: '로고 삭제가 완료되었습니다.'
			};
		} else if (response.status === 404) {
			return {
				status: 404,
				message: '존재하지 않는 기업 ID입니다.'
			};
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
		console.error('로고 삭제 중 오류 발생:', error);
		return {
			status: 500,
			message: '로고 삭제 중 알 수 없는 오류가 발생했습니다.'
		};
	}
};

export const createTestInfo = async (companyId: string, testData: any) => {
	try {
		const token = await getAdminToken();

		const response = await fetch(`${SPRING_URL}/company/${companyId}/position`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token?.value}`
			},
			body: JSON.stringify(testData)
		});

		/**
		 * 정상적으로 생성된 경우, 응답 바디 예:
		 * {
		 *   "position_id": 1
		 * }
		 */
		if (response.status === 200) {
			const data = await response.json(); // { position_id: number }
			return {
				status: 200,
				message: '시험정보 생성이 완료되었습니다.',
				data
			};
		} else if (response.status === 404) {
			return {
				status: 404,
				message: '존재하지 않는 기업 ID입니다.'
			};
		} else if (response.status === 400) {
			const errorData = await response.json();
			return {
				status: 400,
				message: errorData.message || '잘못된 필드가 포함되어 있습니다.'
			};
		} else if (response.status === 409) {
			return {
				status: 409,
				message: '이미 동일한 시험정보가 존재합니다.'
			};
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
				message: errorData.message || '시험정보 생성 중 알 수 없는 오류가 발생했습니다.'
			};
		}
	} catch (error) {
		console.error('시험정보 생성 중 오류 발생:', error);
		return {
			status: 500,
			message: '시험정보 생성 중 알 수 없는 오류가 발생했습니다.'
		};
	}
};

export const deleteTestInfo = async (positionId: string) => {
	try {
		const token = await getAdminToken();

		const response = await fetch(`${SPRING_URL}/position/${positionId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token?.value}`
			}
		});

		/**
		 * 정상적으로 삭제된 경우:
		 * status: 204 (No Content)
		 */
		if (response.status === 204) {
			return {
				status: 204,
				message: '시험정보 삭제가 완료되었습니다.'
			};
		}
		// 존재하지 않는 positionId
		else if (response.status === 404) {
			const errorData = await response.json();
			return {
				status: 404,
				message: errorData.message || '존재하지 않는 직무(시험) ID입니다.'
			};
		}
		// 토큰 만료
		else if (response.status === 401) {
			if (token?.value) {
				deleteAdminToken();
			}
			return {
				status: 401,
				message: '토큰이 만료되었습니다. 다시 로그인하세요.'
			};
		}
		// 그 외 에러 응답
		else {
			const errorData = await response.json();
			return {
				status: response.status,
				message: errorData.message || '시험정보 삭제 중 알 수 없는 오류가 발생했습니다.'
			};
		}
	} catch (error) {
		console.error('시험정보 삭제 중 오류 발생:', error);
		return {
			status: 500,
			message: '시험정보 삭제 중 알 수 없는 오류가 발생했습니다.'
		};
	}
};

export const updateTestInfo = async (positionId: string, testData: any) => {
	try {
		const token = await getAdminToken();

		const response = await fetch(`${SPRING_URL}/position/${positionId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token?.value}`
			},
			body: JSON.stringify(testData)
		});

		if (response.status === 200) {
			const data = await response.json();
			return {
				status: 200,
				message: '시험정보 수정이 완료되었습니다.',
				data
			};
		} else if (response.status === 404) {
			return {
				status: 404,
				message: '존재하지 않는 시험 ID입니다.'
			};
		} else if (response.status === 400) {
			const errorData = await response.json();
			return {
				status: 400,
				message: errorData.message || '잘못된 필드가 포함되어 있습니다.'
			};
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
				message: errorData.message || '시험정보 수정 중 알 수 없는 오류가 발생했습니다.'
			};
		}
	} catch (error) {
		console.error('시험정보 수정 중 오류 발생:', error);
		return {
			status: 500,
			message: '시험정보 수정 중 알 수 없는 오류가 발생했습니다.'
		};
	}
};
