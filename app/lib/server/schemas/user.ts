import { z } from 'zod';

export const TierFormSchema = z.object({
	member_tier: z.coerce
		.number()
		.min(0, '티어를 선택해주세요.')
		.max(100, '올바른 티어를 선택해주세요.')
		.transform((val) => val.toString())
});

export const AdditionalInformationFormSchema = z.object({
	nickname: z
		.string({
			invalid_type_error: '닉네임을 입력해주세요.'
		})
		.min(1, '닉네임을 입력해주세요.'),
	member_tier: z.coerce
		.number({
			invalid_type_error: '티어를 선택해주세요'
		})
		.optional(),
	prefer_languages: z.array(z.string()).optional(),
	prefer_industries: z.array(z.string()).optional()
});
