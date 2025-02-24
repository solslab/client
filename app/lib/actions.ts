'use server';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getLastRoute, getToken, redirectToPrev, updateToken } from './cookie';
import { NEXT_URL, SPRING_URL } from './constants';
import { revalidatePath } from 'next/cache';


export type TiernState = {
    errors?: {
        al_platform?: string[];
        member_tier?: string[];
    };
    message?: string | null;
};

const TierFormSchema = z.object({
    al_platform: z.string({
        invalid_type_error: '플랫폼을 선택해주세요.',
    }),
    member_tier: z.coerce.number(
        {
            invalid_type_error: '티어를 선택해주세요',
        }
    ),
});


export async function updateTier(prevState: TiernState, formData: FormData) {
    let redirectFlag = false;

    const validatedFields = TierFormSchema.safeParse({
        al_platform: formData.get('al_platform'),
        member_tier: formData.get('member_tier'),
    });
    if (!validatedFields.success) {

        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: '오류가 발생했습니다.',
        };
    }


    const tokenCookie = await getToken();
    const token = tokenCookie?.value || undefined;
    if (!token) {
        redirect('/login')
    }
    try {
        const response = await fetch(`${SPRING_URL}/member`, {
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
        redirectFlag = true;
        return {
            message: null
        }

    } catch (error) {
        console.error(error);
        return {
            message: '티어 설정 중 문제가 발생했습니다.'
        }
    } finally {
        if (redirectFlag) {
            redirect('/testReview')

        }

    }

}

export type AdditionalInformationState = {
    errors?: {
        nickname?: string[];
        al_platform?: string[];
        member_tier?: string[];
        prefer_languages?: string[];
        prefer_industries?: string[];


    };
    message?: string | null;
};

const AdditionalInformationFormSchema = z.object({
    nickname: z.string({
        invalid_type_error: '닉네임을 입력해주세요.'
    }).optional(),
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
    let redirectFlag = false;

    const validatedFields = AdditionalInformationFormSchema.safeParse({
        nickname: formData.get('nickname') || undefined,
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


    const tokenCookie = await getToken();
    const pathCookie = await getLastRoute();
    const token = tokenCookie?.value || undefined;
    const path = pathCookie?.value || '/'
    if (!token) {
        redirect('/login')
    }
    try {
        const response = await fetch(`${SPRING_URL}/member`, {
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
        redirectFlag = true;
        return data;

    } catch (error) {
        console.error(error);
    } finally {
        if (redirectFlag) {
            // revalidatePath('/','layout')
            redirect(path)
        }

    }

}

const suggestionFormSchema = z.object({
    suggestion_content: z.string({
        invalid_type_error: '내용을 입력해주세요.'
    }).min(1, { message: '내용은 최소 1자 이상이어야 합니다.' })
        .max(200, { message: '내용은 최대 200자까지 입력할 수 있습니다.' })
});

export type SuggestionState = {
    errors?: {
        suggestion_content?: string[];
    };
    message?: string | null;
    submitted?: boolean;
    fullfilled?: boolean;
};

export async function createSuggestion(prevState: SuggestionState, formData: FormData, positionId: string) {
    const validatedFields = suggestionFormSchema.safeParse({
        suggestion_content: formData.get('suggestion_content')
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: '오류가 발생했습니다.',
        };
    }


    const tokenCookie = await getToken();
    const pathCookie = await getLastRoute();
    const token = tokenCookie?.value || undefined;
    const path = pathCookie?.value || '/'
    try {
        if (!token) {
            redirect('/login')
        }

        const response = await fetch(`${SPRING_URL}/suggestion/${positionId}`, {
            method: 'POST',
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
        return {
            submitted: true,
            fullfilled: true
        }

    } catch (error) {
        console.error('createSuggestion중 오류발생', error)
        return {
            submitted: true,
            fullfilled: false
        }
    }

}

export type TestReviewState = {
    errors?: {
        company_id?: string[];
        company_name?: string[];
        tr_year?: string[];
        tr_position?: string[];
        tr_career?: string[];
        tr_problem_num?: string[];
        tr_solved_num?: string[];
        tr_pass_status?: string[];
        tr_problem_type?: string[];
        tr_comment?: string[];
    };
    message?: string | null;
    fullfilled?: boolean;
};

const TestReviewFormSchema = z.object({
    company_id: z.string({
        invalid_type_error: 'id를 입력해주세요.'
    }).optional(),
    company_name: z.string({
        invalid_type_error: '회사명을 입력해주세요.'
    }).min(1, '회사명을 입력해주세요.'),
    tr_year: z.string({
        invalid_type_error: '응시년도를 입력해주세요.',
    }),
    tr_position: z.string({
        invalid_type_error: '직무를 선택해주세요.',
    }).optional(),
    tr_career: z.string({
        invalid_type_error: '채용형태를 입력해주세요.',
    }),
    tr_problem_num: z.coerce.number({
        invalid_type_error: '총 문제수를 입력해주세요.',
    }).min(1, '총 문제수를 입력해주세요.').max(30, '총 문제 수는 30이하여야 합니다.'),
    tr_solved_num: z.coerce.number({
        invalid_type_error: '푼 문제수를 입력해주세요.',
    }).min(0, '푼 문제수를 입력해주세요.').max(30, '푼 문제 수는 30이하여야 합니다.'),
    tr_pass_status: z.string({
        invalid_type_error: '합격 여부를 입력해주세요.',
    }),
    tr_problem_type: z.string({
        invalid_type_error: '문제 유형을 선택해주세요.'
    }).min(1, { message: '문제 유형을 선택해주세요.' })
        .transform((val) => {
            return val.split(',').map(item => item.trim());
        }),
    tr_comment: z.string({
        invalid_type_error: '한줄 리뷰를 입력해주세요.',
    }).min(1, '1자 이상 입력해주세요.').max(100, '100자 이하로 입력해주세요.'),
});

export async function createTestReview(prevState: TestReviewState, formData: FormData) {
    let flag = false;

    const validatedFields = TestReviewFormSchema.safeParse({
        company_id: formData.get('company_id') || undefined,
        company_name: formData.get('company_name'),
        tr_year: formData.get('tr_year'),
        tr_position: formData.get('tr_position'),
        tr_career: formData.get('tr_career'),
        tr_problem_num: formData.get('tr_problem_num'),
        tr_solved_num: formData.get('tr_solved_num'),
        tr_pass_status: formData.get('tr_pass_status'),
        tr_problem_type: formData.get('tr_problem_type'),
        tr_comment: formData.get('tr_comment')
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: '잘못된 필드가 있습니다.',
        };
    }


    const tokenCookie = await getToken();
    const token = tokenCookie?.value || undefined;
    if (!token) {
        redirect('/login')
    }
    try {
        const response = await fetch(`${SPRING_URL}/tr`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(validatedFields.data)
        });

        if (!response.ok) {
            const result = await response.text();
            throw new Error(`${result}`);

        }

        const newToken = response.headers.get('Authorization');
        if (newToken) {
            updateToken(newToken)
        }
        flag = true;
        const data = await response.json();
        return {
            fullfilled: true
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log('createTestReview중 오류 발생:', typeof error);
            const parsedError:{error_code:string;message:string;} = JSON.parse(error.message);
            return { message: parsedError.message || "알 수 없는 오류 발생" };
        } else {
            return {
                message: '제출 중 문제가 발생했습니다.'
            }
        }
    }
    // finally {
    //     if (flag) {
    //         await redirectToPrev();
    //     }
    // }


}

export type FeedBackState = {
    errors?: {
        rating?: string[];
        feedback_content?: string[];
    };
    message?: string | null;
    fullfiled?: {
        value?: boolean;
        status?: boolean | null;
    }
};

const FeedBackSchema = z.object({
    rating: z.coerce.number({
        invalid_type_error: '별점을 입력해주세요.'
    }).min(1, '별점을 입력해주세요.').max(5, '유효하지 않은 값입니다.'),
    feedback_content: z.string({
        invalid_type_error: '총 문제수를 입력해주세요.',
    }).max(50, '피드백 내용은 50자 이하로 입력해주세요.').optional(),

});


export async function createFeedBack(prevState: FeedBackState, formData: FormData) {
    const validatedFields = FeedBackSchema.safeParse({
        rating: formData.get('rating'),
        feedback_content: formData.get('feedback_content') || undefined,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: '오류가 발생했습니다.',
            fullfiled: {
                value: false,
                status: true
            }
        };
    }



    try {
        const response = await fetch(`${SPRING_URL}/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedFields.data)
        });

        if (!response.ok) {
            const res = await response.text()
            console.error(res)
            throw new Error(`${response.status}`);

        }

        return {
            errors: {},
            message: '피드백이 정상 제출되었습니다.',
            fullfiled: {
                value: true,
                status: true
            }
        };

    } catch (error) {
        console.error('createFeedBack중 오류발생', error)
        return {
            errors: {},
            message: '피드백이 정상 제출되지 않았습니다.',
            fullfiled: {
                value: true,
                status: false
            }
        };

    }

}


export async function infoCheck(tokenParam?: string) {
    try {
        const headers: { 'Content-Type': string; 'Cache-Control': string; 'Authorization'?: string } = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        };

        const token = await getToken();
        const value = tokenParam || token?.value;
        if (!value) {
            return false
        }

        if (value) {
            headers['Authorization'] = `Bearer ${value}`;
        }
        const response = await fetch(`${SPRING_URL}/member/info-check`, {
            method: 'GET',
            headers: headers
        });
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        if (data.status == "complete") {
            return true
        }
        else {
            return false
        }
    }
    catch (error) {
        console.error('infoCheck중 오류발생', error)
        return false
    }
}
