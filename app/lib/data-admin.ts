'use server';

import { SPRING_URL } from './constants';
// import { deleteToken, getToken, updateToken } from './cookie';
import { CompanyPageResponse, AllMemberPage, AllReviewPage, User, TestData, AllSuggestionPage } from './definitions';
import { getAdminToken, deleteAdminToken } from './cookie';

type ErrorResponse = { status: number; message: any };

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

export const getAllPrivateCompanyData = async (
	page: number,
	size: number
): Promise<CompanyPageResponse | undefined> => {
	try {
		const token = await getAdminToken();
		const response = await fetch(`${SPRING_URL}/company/private?page=${page}&size=${size}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token?.value}`
			}
			// next: {
			// 	revalidate: 60 * 60 * 3,
			// }
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

export const searchPrivateCompanies = async (query: string) => {
	try {
		const token = await getAdminToken();
		const response = await fetch(`${SPRING_URL}/company/search-private?q=${query}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token?.value}`
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

export const getAllMembers = async (page: number, size: number): Promise<any> => {
	try {
		const token = await getAdminToken();
		const response = await fetch(`${SPRING_URL}/member/list?page=${page}&size=${size}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token?.value}`
			}
		});

		if (response.ok) {
			const data: AllMemberPage = await response.json();
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
		console.error('전체 회원 조회 중 오류 발생:', error);
		return {
			status: 500,
			message: '전체 회원 조회 중 알 수 없는 오류가 발생했습니다.'
		};
	}
};

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

export const getTestInfo = async (positionId: string): Promise<TestData> => {
	try {
		const token = await getAdminToken();
		const response = await fetch(`${SPRING_URL}/position/${positionId}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token?.value}`
			}
		});

		if (response.ok) {
			const data: TestData = await response.json();
			return data;
		} else if (response.status === 401) {
			if (token?.value) {
				deleteAdminToken();
			}
			throw new Error('토큰이 만료되었습니다. 다시 로그인하세요.');
		} else {
			const errorData = await response.json();
			throw new Error(errorData.message || '알 수 없는 오류가 발생했습니다.');
		}
	} catch (error) {
		console.error('testinfo 조회 중 오류 발생:', error);
		throw new Error(
			error instanceof Error ? error.message : 'testinfo 조회 중 알 수 없는 오류가 발생했습니다.'
		);
	}
};

export const getAllReviews = async (page: number, size: number): Promise<any> => {
	try {
		const token = await getAdminToken();
		const response = await fetch(`${SPRING_URL}/tr?page=${page}&size=${size}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token?.value}`
			}
		});

		if (response.ok) {
			const data: AllReviewPage = await response.json();
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
		console.error('전체 리뷰 조회 중 오류 발생:', error);
		return {
			status: 500,
			message: '전체 리뷰 조회 중 알 수 없는 오류가 발생했습니다.'
		};
	}
};

export const getReviewDetails = async (trId: string): Promise<any> => {
	try {
		const token = await getAdminToken();
		const response = await fetch(`${SPRING_URL}/tr/${trId}`, {
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
		console.error('리뷰 상세조회 중 오류 발생:', error);
		return {
			status: 500,
			message: '리뷰 상세조회 중 알 수 없는 오류가 발생했습니다.'
		};
	}
};

export const getAllSuggestions = async (page: number, size: number): Promise<any> => {
	try {
		const token = await getAdminToken();
		const response = await fetch(`${SPRING_URL}/suggestion?page=${page}&size=${size}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token?.value}`
			}
		});

		if (response.ok) {
			const data: AllSuggestionPage = await response.json();
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
		console.error('전체 정보수정요청 조회 중 오류 발생:', error);
		return {
			status: 500,
			message: '전체 정보수정요청 조회 중 알 수 없는 오류가 발생했습니다.'
		};
	}
};

export const getSuggestionDetails = async (suggestionId: string): Promise<any> => {
	try {
		const token = await getAdminToken();
		const response = await fetch(`${SPRING_URL}/suggestion/${suggestionId}`, {
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
		console.error('정보수정요청 상세조회 중 오류 발생:', error);
		return {
			status: 500,
			message: '정보수정요청 상세조회 중 알 수 없는 오류가 발생했습니다.'
		};
	}
};

export const updateSuggestionStatus = async (
	suggestionId: string,
	status: string
): Promise<any> => {
	try {
		const token = await getAdminToken();
		const response = await fetch(`${SPRING_URL}/suggestion/${suggestionId}?status=${status}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${token?.value}`
			}
		});

		if (response.ok) {
			return { status: 200, message: '상태 변경 성공' };
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
		console.error('정보수정요청 상태변경 중 오류 발생:', error);
		return {
			status: 500,
			message: '정보수정요청 상태변경 중 알 수 없는 오류가 발생했습니다.'
		};
	}
};

export const getAllFeedbacks = async (page: number, size: number): Promise<any> => {
	try {
		const token = await getAdminToken();
		const response = await fetch(`${SPRING_URL}/feedback?page=${page}&size=${size}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token?.value}`
			}
		});

		if (response.ok) {
			const data: AllSuggestionPage = await response.json();
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
		console.error('전체 피드백 조회 중 오류 발생:', error);
		return {
			status: 500,
			message: '전체 피드백 조회 중 알 수 없는 오류가 발생했습니다.'
		};
	}};