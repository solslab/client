import { NextRequest, NextResponse } from 'next/server';
import { tokenTest } from './app/lib/auth';
import { infoCheck } from './app/lib/actions';
import { getLastRoute } from './app/lib/cookie';
import { ADMIN_URL, NEXT_URL } from './app/lib/constants';
import { getDateOneMonthLater } from './app/lib/utils';

export default async function middleware(request: NextRequest) {
	const requestUrl = request.nextUrl.href;
	const pathName = request.nextUrl.pathname;

	const url = request.nextUrl.clone();
	const hostname = request.headers.get('host');

	let token;
	if (pathName.startsWith('/admin') || hostname === ADMIN_URL) {
		token = await tokenTest('ADMIN');
	} else token = await tokenTest('USER');

	const lastPathCookie = await getLastRoute();
	const lastPath = lastPathCookie?.value || '/';
	let response;

	// 배포환경 관리자 인가처리
	if (hostname && hostname === ADMIN_URL) {
		url.pathname = `/admin${url.pathname}`; // 서브도메인 처리
		if (pathName === '/login' || pathName === '/api/login') {
			return NextResponse.rewrite(url);
		} else if (token && token.role === 'ADMIN') {
			response = NextResponse.rewrite(url);

			if (token.new_token) {
				const clearToken = token.new_token.replace('Bearer ', '');
				response.cookies.set('solslab-accessToken', clearToken, {
					httpOnly: true,
					secure: true,
					expires: getDateOneMonthLater()
				});
			}
		} else {
			response = NextResponse.redirect('https://' + ADMIN_URL + '/login');
			response.cookies.delete('solslab-accessToken');
		}
		return response;
	}

	// 개발환경 관리자 인가처리 - 배포환경에서는 Nginx로 403 처리
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
		// 이외의 경우 모두 통과
		response = NextResponse.next();
		if (token && token.new_token) {
			const clearToken = token.new_token.replace('Bearer ', '');
			response.cookies.set('sols-accessToken', clearToken, {
				httpOnly: true,
				secure: true,
				expires: getDateOneMonthLater()
			});
		}
		return response;

		// if (token) {
		// 	response = NextResponse.next();

		// 	if (token.new_token) {
		// 		const clearToken = token.new_token.replace('Bearer ', '');
		// 		response.cookies.set('sols-accessToken', clearToken, {
		// 			httpOnly: true,
		// 			secure: true,
		// 			expires: getDateOneMonthLater()
		// 		});
		// 	}
		// } else {
		// 	response = NextResponse.redirect(NEXT_URL + '/login');
		// 	response.cookies.delete('sols-accessToken');
		// }
		// return response;
	}
}

// export const config = {
// 	matcher: [
// 		'/admin/:path*',
// 		'/company/:id*',
// 		'/profiles/:path*',
// 		'/testReview',
// 		'/login',
// 		'/member/:path*',
// 		'/company/:path*'
// 	]
// };
