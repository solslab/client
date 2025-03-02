import { z } from 'zod';

export const TierFormSchema = z.object({
	member_tier: z.number().min(0, '티어를 선택해주세요.').max(30, '올바른 티어를 선택해주세요.')
});

export const AdditionalInformationFormSchema = z.object({
	nickname: z
		.string({
			invalid_type_error: '닉네임을 입력해주세요.'
		})
		.optional(),
	al_platform: z.string({
		invalid_type_error: '플랫폼을 선택해주세요.'
	}),
	member_tier: z.coerce.number({
		invalid_type_error: '티어를 선택해주세요'
	}),
	prefer_languages: z
		.string()
		.transform((val) => {
			return val.split(',').map((item) => item.trim());
		})
		.refine((val) => val.length > 0, {
			message: '주로 사용하는 언어를 선택해주세요'
		}),
	prefer_industries: z
		.string()
		.transform((val) => {
			return val.split(',').map((item) => item.trim());
		})
		.refine((val) => val.length > 0, {
			message: '가고싶은 기업을 1개 이상 선택해주세요.'
		})
});
