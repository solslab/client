export interface DataLabDetail {
	member_tier: number;
	tr_year: string;
	tr_position: string;
	tr_career: string;
	tr_problem_num: number;
	tr_solved_num: number;
	tr_pass_status: string;
}

export type DataItem = {
	member_tier: number;
	tr_year: string;
	tr_position: string | null;
	tr_career: string;
	tr_problem_num: number;
	tr_solved_num: number;
	tr_pass_status: string;
};
