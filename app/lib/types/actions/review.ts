export interface TestReviewState {
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
		difficulty?: string[];
	};
	message?: string | null;
	fullfilled?: boolean;
}

export interface FeedBackState {
	errors?: {
		rating?: string[];
		feedback_content?: string[];
	};
	message?: string | null;
	fullfiled?: {
		value?: boolean;
		status?: boolean | null;
	};
}
