import { NextRequest, NextResponse } from 'next/server'
import { tokenTest } from './app/lib/auth';
import { infoCheck } from './app/lib/actions';
import { getLastRoute } from './app/lib/cookie';
import { NEXT_URL } from './app/lib/constants';
import { getDateOneMonthLater } from './app/lib/utils';


export default async function middleware(request: NextRequest) {
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
                response.cookies.set("sols-accessToken", clearToken,{
                    httpOnly: true,
                    secure:true,
                    expires:getDateOneMonthLater()
                  });
            }
        }
        else {
            response = NextResponse.redirect(NEXT_URL + '/login');
            response.cookies.delete("sols-accessToken")
        }
        return response;
    }
    else if (pathName.startsWith('/company')) {
        if (token) {
            if (token.new_token) {
                response = NextResponse.next();
                const clearToken = token.new_token.replace('Bearer ', '');
                response.cookies.set("sols-accessToken", clearToken,{
                    httpOnly: true,
                    secure:true,
                    expires:getDateOneMonthLater()
                  });
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
                    response = NextResponse.redirect(NEXT_URL + lastPath);
            }

            if (token.new_token) {
                const clearToken = token.new_token.replace('Bearer ', '');
                response.cookies.set("sols-accessToken", clearToken,{
                    httpOnly: true,
                    secure:true,
                    expires:getDateOneMonthLater()
                  });
            }
        }
        else {
            response = NextResponse.redirect(NEXT_URL + '/login');
            response.cookies.delete("sols-accessToken")
        }
        return response;
    }
    else if(pathName.startsWith('/login')) {

        if (token) {
            response = NextResponse.redirect(NEXT_URL + lastPath);
            return response
        }
        else {
            response = NextResponse.next()
            response.cookies.delete("sols-accessToken")
        }
        return response;
    }
    else{
        if (token) {
            response = NextResponse.next();

            if (token.new_token) {
                const clearToken = token.new_token.replace('Bearer ', '');
                response.cookies.set("sols-accessToken", clearToken,{
                    httpOnly: true,
                    secure:true,
                    expires:getDateOneMonthLater()
                  });
            }
        }
        else {
            response = NextResponse.redirect(NEXT_URL + '/login');
            response.cookies.delete("sols-accessToken")
        }
        return response;
    }



}
export const config = {
    matcher: ['/company/:id*', '/profiles/:path*','/testReview','/login']
};



