import { getToken } from "./cookie";

const url = process.env.SPRING_URL

export async function signIn() {
}
export async function signOut() {
}
export async function join() {
}


export async function tokenTest() {
    try {
        const headers: { 'Content-Type': string; 'Cache-Control': string; 'Authorization'?: string } = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        };
        const token = await getToken();
        const value = token?.value;
        if (value) {
            headers['Authorization'] = `Bearer ${value}`;
        }
        const response = await fetch(`${url}/auth/check`, {
            method: 'GET',
            headers: headers
        });
        const status = response.status
        if(status !=200){
            return false
        }
        const data = await response.json();
        return data;
    }
    catch (error) {

    }
}