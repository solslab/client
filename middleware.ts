import { NextRequest, NextResponse } from 'next/server'
import { tokenTest } from './app/lib/auth';
import { infoCheck } from './app/lib/actions';
import { getLastRoute } from './app/lib/cookie';
import { ADMIN_URL, NEXT_URL } from './app/lib/constants';
import { getDateOneMonthLater } from './app/lib/utils';


export default async function middleware(request: NextRequest) {
	const requestUrl = request.nextUrl.href;
	const pathName = request.nextUrl.pathname;

	let token;
	if (pathName.startsWith('/admin')) {
		token = await tokenTest('ADMIN');
	} else token = await tokenTest('USER');

	const lastPathCookie = await getLastRoute();
	const lastPath = lastPathCookie?.value || '/';
	let response;

	const host = request.headers.get('host');

	if (pathName.startsWith('/admin')) {
		if (pathName === '/admin/login' || pathName === '/admin/api/login') {
			return NextResponse.next();
		} else if (token && token.role === 'ADMIN') {
			response = NextResponse.next();

			if (token.new_token) {
				const clearToken = token.new_token.replace('Bearer ', '');
				response.cookies.set('solslab-accessToken', clearToken, {
					httpOnly: true,
					secure: true,
					expires: getDateOneMonthLater()
				});
			}
		} else {
			response = NextResponse.redirect(NEXT_URL + '/admin/login');
			response.cookies.delete('solslab-accessToken');
		}

		return response;
	}

	// if (host === 'admin.sols.kr') {
	// 	// 프로덕션 환경 관리자 인가처리
	// 	if (pathName === '/login' || pathName === '/api/admin') {
	// 		return NextResponse.next();
	// 	}
	// 	else if (token && token.role === 'ADMIN') {
	// 		response = NextResponse.next();
	// 		if (token.new_token) {
	// 				const clearToken = token.new_token.replace('Bearer ', '');
	// 				response.cookies.set('solslab-accessToken', clearToken, {
	// 					httpOnly: true,
	// 					secure: true,
	// 					expires: getDateOneMonthLater()
	// 				});
	// 		}
	// 		else {
	// 			response = NextResponse.redirect(ADMIN_URL + '/login');
	// 			response.cookies.delete('solslab-accessToken');
	// 		}
	// 		return response;
	// 	}
	// } else {
	// 	// 개발환경 관리자 인가처리
	// 	if (pathName.startsWith('/admin')) {
	// 		if (pathName === '/admin/login' || pathName === '/admin/api/login') {
	// 			return NextResponse.next();
	// 		} else if (token && token.role === 'ADMIN') {
	// 			response = NextResponse.next();

	// 			if (token.new_token) {
	// 				const clearToken = token.new_token.replace('Bearer ', '');
	// 				response.cookies.set('solslab-accessToken', clearToken, {
	// 					httpOnly: true,
	// 					secure: true,
	// 					expires: getDateOneMonthLater()
	// 				});
	// 			}
	// 		} else {
	// 			response = NextResponse.redirect(NEXT_URL + '/admin/login');
	// 			response.cookies.delete('solslab-accessToken');
	// 		}

	// 		return response;
	// 	}
	// }

	if (pathName.includes('suggestion')) {
		if (token) {
			response = NextResponse.next();

			if (token.new_token) {
				const clearToken = token.new_token.replace('Bearer ', '');
				response.cookies.set('sols-accessToken', clearToken, {
					httpOnly: true,
					secure: true,
					expires: getDateOneMonthLater()
				});
			}
		} else {
			response = NextResponse.redirect(NEXT_URL + '/login');
			response.cookies.delete('sols-accessToken');
		}
		return response;
	} else if (pathName.startsWith('/company')) {
		if (token) {
			if (token.new_token) {
				response = NextResponse.next();
				const clearToken = token.new_token.replace('Bearer ', '');
				response.cookies.set('sols-accessToken', clearToken, {
					httpOnly: true,
					secure: true,
					expires: getDateOneMonthLater()
				});
			}
		} else if (token == false) {
			response = NextResponse.redirect(requestUrl);
			response.cookies.delete('sols-accessToken');
		}
		return response;
	} else if (pathName.startsWith('/profiles')) {
		if (token) {
			response = NextResponse.next();

			if (token.new_token) {
				const clearToken = token.new_token.replace('Bearer ', '');
				response.cookies.set('sols-accessToken', clearToken, {
					httpOnly: true,
					secure: true,
					expires: getDateOneMonthLater()
				});
			}
			if (pathName.startsWith('/profiles/additional')) {
				response = NextResponse.redirect(NEXT_URL + lastPath, {
					status: 308
				});
			}
		} else {
			response = NextResponse.redirect(NEXT_URL + '/login');
			response.cookies.delete('sols-accessToken');
		}
		return response;
	} else if (pathName.startsWith('/login')) {
		if (token) {
			response = NextResponse.redirect(NEXT_URL + lastPath);
			return response;
		} else {
			response = NextResponse.next();
			response.cookies.delete('sols-accessToken');
		}
		return response;
	} else {
		if (token) {
			response = NextResponse.next();

			if (token.new_token) {
				const clearToken = token.new_token.replace('Bearer ', '');
				response.cookies.set('sols-accessToken', clearToken, {
					httpOnly: true,
					secure: true,
					expires: getDateOneMonthLater()
				});
			}
		} else {
			response = NextResponse.redirect(NEXT_URL + '/login');
			response.cookies.delete('sols-accessToken');
		}
		return response;
	}
}
export const config = {
    matcher: ['/admin/:path*', '/company/:id*', '/profiles/:path*','/testReview','/login']
};



