import { urlBuilder } from '@/lib/urlBuilder';
import { Suggestion } from '@/models/suggestion';
import { Token } from '@/models/token';

interface AddSuggestionParams {
	queryKey: [string, Suggestion, string | undefined];
}
export const addSuggestion = async ({ queryKey }: AddSuggestionParams): Promise<Suggestion> => {
	const [_, suggestion, token] = queryKey;
	const response = await fetch(urlBuilder({ path: 'suggestions', subdomain: 'suggestions' }), {
		method: 'POST',
		body: JSON.stringify(suggestion),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	return await response.json();
};
