import { NextRequest, NextResponse } from 'next/server'
import { tokenTest } from './app/lib/auth';
export default async function middleware(request: NextRequest) {
    const cookie = request.cookies.get("sols-accessToken");
    const requestUrl = request.nextUrl.href;
    const response = NextResponse.redirect(requestUrl);
    if(cookie){
       const data = await tokenTest();
        if(data){
            if(data.new_token){
                response.cookies.set("sols-accessToken",data.new_token);
                return response;
            }
        }
        else{
            response.cookies.delete("sols-accessToken")
            return response;
        }
    }

    }
    export const config = {
        matcher: ['/company/:id*'], // 동적 경로 매칭
      };
  

  
  