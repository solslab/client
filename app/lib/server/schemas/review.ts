import { z } from 'zod';

export const TestReviewFormSchema = z.object({
	company_id: z
		.string({
			invalid_type_error: '회사를 선택해주세요.'
		})
		.optional()
		.nullable(),
	company_name: z.string({
		invalid_type_error: '회사를 선택해주세요.',
		required_error: '회사를 선택해주세요.'
	}),
	tr_year: z.string({
		invalid_type_error: '연도를 선택해주세요.',
		required_error: '연도를 선택해주세요.'
	}),
	tr_position: z.string({
		invalid_type_error: '포지션을 선택해주세요.',
		required_error: '포지션을 선택해주세요.'
	}),
	tr_career: z.string({
		invalid_type_error: '경력을 선택해주세요.',
		required_error: '경력을 선택해주세요.'
	}),
	tr_problem_num: z.coerce
		.number({
			invalid_type_error: '문제 수를 입력해주세요.',
			required_error: '문제 수를 입력해주세요.'
		})
		.min(1, { message: '문제 수는 1개 이상이어야 합니다.' }),
	tr_solved_num: z.coerce
		.number({
			invalid_type_error: '해결한 문제 수를 입력해주세요.',
			required_error: '해결한 문제 수를 입력해주세요.'
		})
		.min(0, { message: '해결한 문제 수는 0개 이상이어야 합니다.' }),
	tr_pass_status: z.string({
		invalid_type_error: '합격 여부를 선택해주세요.',
		required_error: '합격 여부를 선택해주세요.'
	}),
	tr_problem_type: z.array(z.string()).min(1, '문제 유형을 1개 이상 선택해주세요.'),
	tr_comment: z
		.string({
			invalid_type_error: '후기를 입력해주세요.',
			required_error: '후기를 입력해주세요.'
		})
		.min(1, { message: '후기는 최소 1자 이상이어야 합니다.' })
		.max(200, { message: '후기는 최대 200자까지 입력할 수 있습니다.' }),
	difficulty: z.number({
		invalid_type_error: '난이도를 선택해주세요.',
		required_error: '난이도를 선택해주세요.'
	})
});

export const FeedbackFormSchema = z.object({
	rating: z.coerce
		.number({
			invalid_type_error: '평점을 선택해주세요.'
		})
		.min(1, { message: '평점은 1점 이상이어야 합니다.' })
		.max(5, { message: '평점은 5점 이하여야 합니다.' }),
	feedback_content: z
		.string({
			invalid_type_error: '피드백을 입력해주세요.'
		})
		.min(1, { message: '피드백은 최소 1자 이상이어야 합니다.' })
		.max(200, { message: '피드백은 최대 200자까지 입력할 수 있습니다.' })
});

export type TestReviewState = {
	message: string;
	errors: {
		company_name?: string[];
		tr_position?: string[];
		tr_career?: string[];
		tr_year?: string[];
		tr_problem_num?: string[];
		tr_solved_num?: string[];
		tr_pass_status?: string[];
		tr_comment?: string[];
		tr_problem_type?: string[];
	};
	fullfilled?: boolean;
};
