import { z } from 'zod';

export const TestReviewFormSchema = z.object({
	company_name: z.string().min(1, '기업명을 입력해주세요.'),
	tr_position: z.string().min(1, '지원직무를 선택해주세요.'),
	tr_career: z.string().min(1, '채용형태를 선택해주세요.'),
	tr_year: z.string().min(1, '응시년도를 선택해주세요.'),
	tr_problem_num: z.string().min(1, '전체 문제 수를 입력해주세요.'),
	tr_solved_num: z.string().min(1, '푼 문제 수를 선택해주세요.'),
	tr_pass_status: z.string().min(1, '합격 여부를 선택해주세요.'),
	tr_comment: z.string().min(1, '한줄 후기를 입력해주세요.').max(100, '100자 이내로 입력해주세요.'),
	tr_problem_type: z.string().optional()
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
