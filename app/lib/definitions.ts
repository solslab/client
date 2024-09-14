export interface User {
    name: string;
    email: string;
    member_tier: number;
    prefer_languages: string[];
    prefer_positions: string[];
    prefer_industries: string[];
    social_type: string;
};

export interface UserUpdateField {
    member_tier?: number;
    prefer_languages?: string[];
    prefer_positions?: string[];
    prefer_industries?: string[];
};

export interface Company {
    company_name: string;
    industry_type: string[];
    company_logo: string;
    positions:Position[];
}
export interface CompanyQuery {
    company_id:string;
    company_name: string;
    company_logo: string;
}
export interface Position {
    position_id:string;
    position_name:string;

}
export interface TestData {
    login_status: string;
    position_name: string;
    support_languages: string[];
    test_time: string;
    problem_info: string;
    permit_ide: string;
    permit_search: string;
    hidden_case: string;
    exam_mode: string;
    test_place: string;
    note: string;
  }

  export interface Profile {
    name: string;
    nickname: string;
    email: string;
    al_platform: string;
    member_tier: number;
    prefer_languages: string[]
    prefer_industries: string[]
    social_type: string;
    created_date: string;
  }