'use server';

import { permanentRedirect, redirect } from "next/navigation";
import { NEXT_URL, SPRING_URL } from "./constants";
import { deleteToken, getToken, updateToken } from "./cookie";
import { Company, CompanyOverviewData, CompanyPageResponse, CompanyQuery, DataLabDetail } from './definitions';


export const fetchRandomCompany = async():Promise<CompanyQuery[] | null> => {
    try{
        const response = await fetch(`${SPRING_URL}/company/home-random`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                revalidate: 60 * 60 * 3,
            }
        })
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('fetchRandomCompany중 오류 발생:', error);
        return null;
    }
}

export const fetchCompanyData = async (page: number, size: number): Promise<CompanyPageResponse | undefined> => {
    try {
        const response = await fetch(`${SPRING_URL}/company?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                revalidate: 60 * 60 * 3,
            }
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

export const fetchFilteredCompanys = async (query: string) => {
    try {
        const response = await fetch(`${SPRING_URL}/company/search?q=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`오류 발생: ${response.status}`);
        }

        const data = await response.json();
        return data

    } catch (error) {
        console.error('fetchFilteredCompanys중 오류 발생:', error);
    }

};

export const fetchFiltereAllCompanys = async (query: string) => {
    try {
        const response = await fetch(`${SPRING_URL}/company/searchAll?q=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`오류 발생: ${response.status}`);
        }

        const data = await response.json();
        return data

    } catch (error) {
        console.error('fetchFilteredAllCompanys중 오류 발생:', error);
    }

};
export const fetchCompanyDetail = async (id: string): Promise<Company|undefined>  => {
    try {
        const response = await fetch(`${SPRING_URL}/company/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
        });

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        const data = await response.json();
        return data

    } catch (error) {
        console.error('fetchCompanyDetail중 오류 발생:', error);
    }
};

export const fetchPositionData = async (id: string) => {
    const headers: { 'Content-Type': string;'Cache-Control':string; 'Authorization'?: string } = {
        'Content-Type': 'application/json' ,
        'Cache-Control': 'no-cache'
    };
    const token = await getToken();
    const value = token?.value ;
    if(value){
        headers['Authorization'] = `Bearer ${value}`; 
    }

    try {
        const response = await fetch(`${SPRING_URL}/tab/testInfo/${id}`, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        const newToken = response.headers.get('Authorization');
        if (newToken) {
            updateToken(newToken)
        }

        const data = await response.json();
        return data

    } catch (error) {
        console.error('fetchPositionData중 오류 발생:', error);
    }
};

export const fetchProfile = async () => {
    const headers: { 'Content-Type': string;'Cache-Control'?:string; 'Authorization'?: string } = {
        'Content-Type': 'application/json' ,
    };
    const token = await getToken();
    const value = token?.value ;

    if(value){
        headers['Authorization'] = `Bearer ${value}`; 
    }


    try {
        const response = await fetch(`${SPRING_URL}/member`, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        const newToken = response.headers.get('Authorization');
        if (newToken) {
            updateToken(newToken)
        }
        const data = await response.json();
        return data

    } catch (error) {
        console.error('fetchProfile중 에러발생',error)
        deleteToken();
        // redirect('/login')
    }
};

export const fetchDatalabData = async (id: string) => {
    const headers: { 'Content-Type': string;'Cache-Control'?:string; 'Authorization'?: string } = {
        'Content-Type': 'application/json' ,
    };
    const token = await getToken();
    const value = token?.value ;

    if(value){
        headers['Authorization'] = `Bearer ${value}`; 
    }
    try {
        const response = await fetch(`${SPRING_URL}/tab/datalab/${id}`, {
            method: 'GET',
            headers: headers,
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
        const data : DataLabDetail[] = await response.json();
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
}

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
            }
		}
        else if (response.status == 401) {
            return {
                status: 401,
                message: '이메일 혹은 비밀번호가 잘못되었습니다. 정확히 입력해주세요.'
            }
        }

		return {
            status: 200,
            data: await response.json()
        };
	} catch (error) {
		console.error('로그인 중 에러 발생:', error);
	}
};

