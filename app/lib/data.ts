
import { getToken } from "./cookie";
const url = process.env.SPRING_URL;

export const fetchCompanyData = async () => {
    try {
        const response = await fetch(`${url}/company`, {
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
        console.error('Fetch 요청 중 오류 발생:', error);
    }
};

export const fetchFilteredCompanys = async (query: string) => {
    try {
        const response = await fetch(`${url}/company/search?q=${query}`, {
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
        console.error('Fetch 요청 중 오류 발생:', error);
    }

};
export const fetchCompanyDetail = async (id: string) => {
    try {
        const response = await fetch(`${url}/company/${id}`, {
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
        console.error('Fetch 요청 중 오류 발생:', error);
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
        const response = await fetch(`${url}/tab/testInfo/${id}`, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        return data

    } catch (error) {
        console.error('Fetch 요청 중 오류 발생:', error);
    }
};

export const fetchProfile = async () => {
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
        const response = await fetch(`${url}/member`, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        return data

    } catch (error) {
        console.error('Fetch 요청 중 오류 발생:', error);
    }
};
