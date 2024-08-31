'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'

export async function updateLastRoute(path:string) {
    cookies().set('sols-lastPath', path)
}
export async function getLastRoute() {
    const path = cookies().get('sols-lastPath');
    return path
}

export async function updateToken(token: string) {
    cookies().set('sols-accessToken', token)
}
export async function readToken() {
    const theme = cookies().get('sols-accessToken');
    if (theme) return true
    return false
}
export async function getToken() {
    const token = cookies().get('sols-accessToken');
    return token
}

export async function deleteToken() {
    cookies().delete('sols-accessToken')
}
export async function reload(path:string) {
    revalidatePath(path);
}