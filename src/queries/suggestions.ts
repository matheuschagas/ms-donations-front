import { urlBuilder } from '@/lib/urlBuilder';
import { Suggestion } from '@/models/suggestion';

interface AddSuggestionParams {
	queryKey: [string, Suggestion];
}
export const addSuggestion = ({ queryKey }: AddSuggestionParams): Promise<Suggestion> => {
	const suggestion = queryKey[1];
	return fetch(urlBuilder({ path: 'suggestions', subdomain: 'suggestions' }), {
		method: 'POST',
		body: JSON.stringify(suggestion),
	}).then(async (response) => await response.json());
};
