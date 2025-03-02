'use server';

import { SPRING_URL } from '@/app/lib/utils/constants';
import {
	deleteAdminToken,
	deleteToken,
	getAdminToken,
	getToken,
	updateToken
} from '@/app/lib/utils/cookie';
import {
	AllFeedbackPage,
	AllMemberPage,
	AllReviewPage,
	AllSuggestionPage,
	CompanyPageResponse,
	ReviewDetail,
	SuggestionDetail,
	TestData,
	User
} from '@/app/lib/types/models';
import { cookies } from 'next/headers';

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
	}
};
