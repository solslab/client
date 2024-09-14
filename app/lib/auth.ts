'use server';
import { revalidatePath } from "next/cache";
import { deleteToken, getToken } from "./cookie";
import { redirect } from "next/navigation";
import { NEXT_URL, SPRING_URL } from "./constants";



export async function logOut(path: string) {

    try {
        const headers: { 'Content-Type': string; 'Cache-Control': string; 'Authorization'?: string } = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        };
        const token = await getToken();
        if (!token) {
            redirect(NEXT_URL + path)
        }
        const value = token?.value;
        if (value) {
            headers['Authorization'] = `Bearer ${value}`;
        }
        const response = await fetch(`${SPRING_URL}/auth/logout`, {
            method: 'DELETE',
            headers: headers
        });
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        await deleteToken();
        redirect(path)
    }
    catch (error) {
        console.error(error)
        await deleteToken();
        redirect(NEXT_URL + path)
    }
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
        const response = await fetch(`${SPRING_URL}/auth/check`, {
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

export type DeletionState = {
    submitted?: boolean
    message?: string | null;
    fullfiled?: boolean
};

export async function deleteMember(prevState: DeletionState, formData: FormData) {

    const headers: { 'Content-Type': string; 'Cache-Control': string; 'Authorization'?: string } = {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    };
    const token = await getToken();
    if (!token) {
        return {
            submitted: true,
            message: '탈퇴가 정상적으로 완료되지않았습니다.',
            fullfiled: false
        };
    }
    const value = token?.value;
    if (value) {
        headers['Authorization'] = `Bearer ${value}`;
    }

    try {
        const response = await fetch(`${SPRING_URL}/member`, {
            method: 'DELETE',
            headers: headers
        });

        if (!response.ok) {
            const res = await response.text()
            throw new Error(`${response.status}`);

        }
        await deleteToken();
        return {
            submitted: true,
            message: '탈퇴가 완료되었습니다.',
            fullfiled: true
        };

    } catch (error) {
        console.error(error)
        return {
            submitted: true,
            message: '탈퇴가 정상적으로 완료되지않았습니다.',
            fullfiled: false
        };

    }

}