import { TestData } from '../models/company';

export interface CompanyState {
	message: string;
	errors: Record<string, string[]>;
	submitted: boolean;
	status?: number;
	data?: TestData;
}
