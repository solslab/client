export interface SuggestionState {
	errors?: {
		suggestion_content?: string[];
	};
	message?: string | null;
	submitted?: boolean;
	fullfilled?: boolean;
}
