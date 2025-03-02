export interface AllMemberPage {
	members: {
		member_key: string;
		name: string;
		email: string;
		social_type: string;
		created_date: string;
	}[];
	total_elements: number;
	total_pages: number;
	current_page: number;
	page_size: number;
}

export interface AllReviewPage {
	test_reviews: {
		tr_id: string;
		member_name: string;
		company_name: string;
		created_date: string;
	}[];
	total_elements: number;
	total_pages: number;
	current_page: number;
	page_size: number;
}

export interface ReviewDetail {
	company_name: string;
	member_name: string;
	member_tier: number;
	tr_year: string;
	tr_position: string | null;
	tr_career: string;
	tr_problem_num: number;
	tr_solved_num: number;
	tr_pass_status: string;
	tr_problem_type: string[];
	tr_comment: string;
	created_date: string;
}

export interface AllSuggestionPage {
	suggestions: {
		suggestion_id: string;
		company_name: string;
		member_name: string;
		status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
		created_date: string;
	}[];
	total_elements: number;
	total_pages: number;
	current_page: number;
	page_size: number;
}

export interface SuggestionDetail {
	suggestion_id: string;
	company_name: string;
	position_name: string;
	suggestion_content: string;
	member_name: string;
	member_email: string;
	status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
	created_date: string;
}

export interface AllFeedbackPage {
	feedbacks: {
		rating: number;
		feedback_content: string;
		created_date: string;
	}[];
	total_elements: number;
	total_pages: number;
	current_page: number;
	page_size: number;
}
