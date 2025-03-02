export interface CompanyData {
	company_name: string;
	industry_type: string[];
	search_terms: string[];
	public: boolean;
}

export interface TestInfoData {
	position_name: string;
	is_official: boolean;
	support_languages: string[];
	test_time: string;
	problem_info: string;
	permit_ide?: '가능' | '불가능';
	permit_search?: '가능' | '불가능';
	hidden_case?: '있음' | '없음';
	exam_mode?: '대면' | '비대면';
	test_place?: string;
	note?: string;
}

export interface TestData {
	position_id: string;
	position_name: string;
	is_official: boolean;
	support_languages: string[];
	test_time: string;
	problem_info: string;
	permit_ide?: string;
	permit_search?: string;
	hidden_case?: string;
	exam_mode?: string;
	test_place?: string;
	note?: string;
}

export interface Company {
	company_id: string;
	company_name: string;
	company_logo: string | null;
	industry_type: string[];
	search_terms: string[];
	public: boolean;
	positions: Position[];
	created_date: string;
	modified_date: string;
}

export interface CompanyQuery {
	company_id: string;
	company_name: string;
	company_logo: string;
}

export interface Position {
	position_id: string;
	position_name: string;
	is_official: boolean;
	support_languages: string[];
	test_time: string;
	problem_info: string;
	permit_ide?: '가능' | '불가능';
	permit_search?: '가능' | '불가능';
	hidden_case?: '있음' | '없음';
	exam_mode?: '대면' | '비대면';
	test_place?: string;
	note?: string;
	created_date: string;
	modified_date: string;
}

export interface CompanyOverviewData {
	company_id: string;
	company_name: string;
	company_logo: string;
	industry_type: string[];
}

export interface CompanyPageResponse {
	companies: CompanyOverviewData[];
	total_elements: number;
	total_pages: number;
	current_page: number;
	page_size: number;
}
