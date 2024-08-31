import { getToken } from "./cookie";

const url = process.env.SPRING_URL
export async function signOut() {
}


export async function tokenTest() {
    try {
        const headers: { 'Content-Type': string; 'Cache-Control': string; 'Authorization'?: string } = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        };
        const token = await getToken();
        if (!token) {
            return null
        }
        const value = token?.value;
        if (value) {
            headers['Authorization'] = `Bearer ${value}`;
        }
        const response = await fetch(`${url}/auth/check`, {
            method: 'GET',
            headers: headers
        });
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        return false
    }
}