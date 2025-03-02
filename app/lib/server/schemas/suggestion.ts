import { z } from 'zod';

export const SuggestionFormSchema = z.object({
	suggestion_content: z
		.string({
			invalid_type_error: '내용을 입력해주세요.'
		})
		.min(1, { message: '내용은 최소 1자 이상이어야 합니다.' })
		.max(200, { message: '내용은 최대 200자까지 입력할 수 있습니다.' })
});
