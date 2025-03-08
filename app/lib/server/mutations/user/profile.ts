'use server';

import { redirect } from 'next/navigation';
import { getLastRoute, getToken, updateToken } from '@/app/lib/utils/cookie';
import { SPRING_URL } from '@/app/lib/utils/constants';
import { AdditionalInformationFormSchema } from '@/app/lib/server/schemas/user';
import { AdditionalInformationState } from '@/app/lib/types/actions/user';
import { z } from 'zod';

type AdditionalInformationFormData = z.infer<typeof AdditionalInformationFormSchema>;
export async function updateAdditionalInformation(
	prevState: AdditionalInformationState,
	formData: AdditionalInformationFormData
) {
	let redirectFlag = false;

	const validatedFields = AdditionalInformationFormSchema.safeParse({
		nickname: formData.nickname,
		member_tier: formData.member_tier,
		prefer_languages: formData.prefer_languages,
		prefer_industries: formData.prefer_industries
	});
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: '오류가 발생했습니다.'
		};
	}

	const tokenCookie = await getToken();
	const pathCookie = await getLastRoute();
	const token = tokenCookie?.value || undefined;
	const path = pathCookie?.value || '/';
	if (!token) {
		redirect('/login');
	}
	try {
		const response = await fetch(`${SPRING_URL}/member`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(validatedFields.data)
		});

		if (!response.ok) {
			throw new Error(`${response.status}`);
		}

		const newToken = response.headers.get('Authorization');
		if (newToken) {
			updateToken(newToken);
		}
		const data = await response.json();
		redirectFlag = true;
		return data;
	} catch (error) {
		return {
			message: '오류가 발생했습니다.',
			errors: {
				root: ['오류가 발생했습니다.']
			}
		};
	} finally {
		if (redirectFlag) {
			redirect(path);
		}
	}
}
