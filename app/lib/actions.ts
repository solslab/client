'use server';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getLastRoute, getToken, updateToken } from './cookie';
const url = process.env.SPRING_URL

export type AdditionalInformationState = {
    errors?: {
        al_platform?: string[];
        member_tier?: string[];
        prefer_languages?: string[];
        prefer_industries?: string[];
    };
    message?: string | null;
};

const AdditionalInformationFormSchema = z.object({
    al_platform: z.string({
        invalid_type_error: '플랫폼을 선택해주세요.',
    }),
    member_tier: z.coerce.number(
        {
            invalid_type_error: '티어를 선택해주세요',
        }
    ),
    prefer_languages: z.string()
        .transform((val) => {
            return val.split(',').map(item => item.trim());
        })
        .refine((val) => val.length > 0, {
            message: '주로 사용하는 언어를 선택해주세요',
        }),
    prefer_industries: z.string()
        .transform((val) => {
            return val.split(',').map(item => item.trim());
        })
        .refine((val) => val.length > 0, {
            message: '가고싶은 기업을 1개 이상 선택해주세요.',
        }),
});



export async function updateAdditionalInformation(prevState: AdditionalInformationState, formData: FormData) {
    const validatedFields = AdditionalInformationFormSchema.safeParse({
        al_platform: formData.get('al_platform'),
        member_tier: formData.get('member_tier'),
        prefer_languages: formData.get('prefer_languages'),
        prefer_industries: formData.get('prefer_industries'),

    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: '오류가 발생했습니다.',
        };
    }

    const { al_platform, member_tier, prefer_languages, prefer_industries } = validatedFields.data;

    const tokenCookie = await getToken();
    const pathCookie = await getLastRoute();
    const token = tokenCookie?.value || undefined;
    const path = pathCookie?.value || '/'
    try {
        if (!token) {
            redirect('/login')
        }

        const response = await fetch(`${url}/member`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(validatedFields.data)
        });

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        const newToken = response.headers.get('Authorization');
        if (newToken) {
            updateToken(newToken)
        }
        const data = await response.json();

    } catch (error) {
        console.error(error);
    } finally {
        redirect(path)
    }

}