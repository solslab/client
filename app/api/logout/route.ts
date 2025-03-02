import { deleteToken } from '@/app/lib/utils/cookie';
export async function GET(request: Request) {
	await deleteToken();
}
