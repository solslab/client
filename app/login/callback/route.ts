import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { NEXT_URL } from '@/app/lib/utils/constants';
import { handleKakaoLogin } from '@/app/lib/server/mutations/auth';

export async function GET(request: NextRequest) {
	try {
		const url = new URL(request.url);
		const code = url.searchParams.get('code');
		const error = url.searchParams.get('error');
		
		console.log('OAuth Callback - code:', code, 'error:', error);

		if (error) {
			console.error('OAuth error:', error);
			return NextResponse.redirect(new URL('/login?error=oauth&message=소셜 로그인에 실패했습니다.', NEXT_URL));
		}

		if (!code) {
			console.error('No authorization code received');
			return NextResponse.redirect(new URL('/login?error=no_code&message=인증 코드를 받지 못했습니다.', NEXT_URL));
		}

		// 서버 액션으로 카카오 로그인 처리
		const result = await handleKakaoLogin(code, `${NEXT_URL}/login/callback`);

		if (!result.success) {
			return NextResponse.redirect(new URL(`/login?error=${result.error}&message=${result.message}`, NEXT_URL));
		}

		// 이전 경로로 리다이렉트
		return NextResponse.redirect(new URL(result.redirectPath, NEXT_URL));
	} catch (error) {
		console.error('카카오 로그인 에러:', error);
		return NextResponse.redirect(new URL('/login?error=unknown&message=알 수 없는 오류가 발생했습니다.', NEXT_URL));
	}
}
