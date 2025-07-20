import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getDateOneMonthLater } from '@/app/lib/utils/helpers';
import { SPRING_URL, NEXT_URL } from '@/app/lib/utils/constants';

export async function GET(request: NextRequest) {
	try {
		const url = new URL(request.url);
		const code = url.searchParams.get('code');
		const error = url.searchParams.get('error');
		
		console.log('OAuth Callback - code:', code, 'error:', error);

		if (error) {
			console.error('OAuth error:', error);
			return NextResponse.redirect(new URL('/login?error=oauth&message=소셜 로그인에 실패했습니다.', request.url));
		}

		if (!code) {
			console.error('No authorization code received');
			return NextResponse.redirect(new URL('/login?error=no_code&message=인증 코드를 받지 못했습니다.', request.url));
		}

		// 백엔드 API 호출
		const requestBody = {
			code,
			redirectUri: `${NEXT_URL}/login/callback`
		};

		const response = await fetch(`${SPRING_URL}/auth/kakao`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		const data = await response.json();

		if (!response.ok) {
			console.error('Backend login failed:', data);
			return NextResponse.redirect(new URL('/login?error=backend&message=서버 오류가 발생했습니다.', request.url));
		}

		// 성공 시 쿠키 설정
		if (data.access_token) {
			cookies().set('sols-accessToken', data.access_token, {
				httpOnly: true,
				secure: true,
				expires: getDateOneMonthLater()
			});
		}

		// 이전 경로로 리다이렉트
		const prevPath = cookies().get('sols-lastPath');
		const redirectUrl = prevPath ? prevPath.value : '/';
		
		return NextResponse.redirect(new URL(redirectUrl, request.url));
	} catch (error) {
		console.error('카카오 로그인 에러:', error);
		return NextResponse.redirect(new URL('/login?error=unknown&message=알 수 없는 오류가 발생했습니다.', request.url));
	}
}
