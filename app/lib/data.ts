'use server';

import { permanentRedirect, redirect } from "next/navigation";
import { NEXT_URL, SPRING_URL } from "./constants";
import { deleteToken, getToken, updateToken } from "./cookie";
import { Company } from "./definitions";


export const fetchCompanyData = async () => {
    try {
        const response = await fetch(`${SPRING_URL}/company`, {
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
        console.error('fetchCompanyData중 오류 발생:', error);
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
    console.log('fetch~~')
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
