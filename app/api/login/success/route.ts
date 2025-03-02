import { infoCheck } from '@/app/lib/server/queries/auth/check';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getDateOneMonthLater } from '@/app/lib/utils/helpers';
export async function GET(request: Request) {
	const url = new URL(request.url);
	const accessToken = url.searchParams.get('accessToken') || '';
	const prevPath = cookies().get('sols-lastPath');
	const infoTest = await infoCheck(accessToken);
	if (accessToken) {
		cookies().set('sols-accessToken', accessToken, {
			httpOnly: true,
			secure: true,
			expires: getDateOneMonthLater()
		});
	}
	if (prevPath) {
		redirect(prevPath.value);
	} else {
		redirect('/');
	}
}
