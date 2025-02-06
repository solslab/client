import { cookies } from 'next/headers';
import { getDateOneMonthLater } from '@/app/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const { token } = await request.json();

	cookies().set('solslab-accessToken', token, {
		httpOnly: true,
		secure: true,
		expires: getDateOneMonthLater()
	});

	return NextResponse.json({ success: true });
}
