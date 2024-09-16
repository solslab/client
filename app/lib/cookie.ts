'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'
import { permanentRedirect, redirect } from 'next/navigation';
import { NEXT_URL } from './constants';
import Layout from '../company/layout';

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

export async function redirectToPrev() {
    
    const pathCookie = await getLastRoute();
    const path = pathCookie?.value || '/'
    redirect(path)
}
export async function permanentRedirectToPrev() {
    
    const pathCookie = await getLastRoute();
    const path = pathCookie?.value || '/'
    revalidatePath(path,'layout')
    permanentRedirect(path)
}
export async function redirectIfNoToken(){
    const tokenCookie = await getToken();
    const token = tokenCookie?.value || undefined;
    if (!token) {
        redirect('/login')
    }
}