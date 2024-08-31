import { NextRequest, NextResponse } from 'next/server'
import { tokenTest } from './app/lib/auth';
import { infoCheck } from './app/lib/utils';
import { getLastRoute } from './app/lib/cookie';


export default async function middleware(request: NextRequest) {
    const nextUrl = process.env.NEXT_URL
    const requestUrl = request.nextUrl.href;
    const pathName = request.nextUrl.pathname;
    const token = await tokenTest();
    const lastPathCookie = await getLastRoute();
    const lastPath = lastPathCookie?.value || '/';
    let response;
    if (pathName.includes('suggestion')) {
        if (token) {
            response = NextResponse.next();

            if (token.new_token) {
                const clearToken = token.new_token.replace('Bearer ', '');
                response.cookies.set("sols-accessToken", clearToken);
            }
        }
        else {
            response = NextResponse.redirect(nextUrl + '/login');
            response.cookies.delete("sols-accessToken")
        }
        return response;
    }
    else if (pathName.startsWith('/company')) {
        if (token) {
            if (token.new_token) {
                response = NextResponse.next();
                const clearToken = token.new_token.replace('Bearer ', '');
                response.cookies.set("sols-accessToken", clearToken);
            }
        }
        else if (token == false) {
            response = NextResponse.redirect(requestUrl);
            response.cookies.delete("sols-accessToken")
        }
        return response;
    }
    else if (pathName.startsWith('/profiles')) {
        if (token) {
            response = NextResponse.next();
            if (pathName.startsWith('/profiles/additional')) {
                const infoChecked: boolean = await infoCheck();
                if (infoChecked)
                    response = NextResponse.redirect(nextUrl + lastPath);
            }

            if (token.new_token) {
                const clearToken = token.new_token.replace('Bearer ', '');
                response.cookies.set("sols-accessToken", clearToken);
            }
        }
        else {
            response = NextResponse.redirect(nextUrl + '/login');
            response.cookies.delete("sols-accessToken")
        }
        return response;
    }



}
export const config = {
    matcher: ['/company/:id*', '/profiles/:path*']
};



