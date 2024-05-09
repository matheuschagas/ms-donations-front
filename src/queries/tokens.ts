import { urlBuilder } from '@/lib/urlBuilder';
import { Token } from '@/models/token';

export const createToken = async (): Promise<Token | null> => {
	const response = await fetch(
		urlBuilder({
			path: `tokens`,
			subdomain: 'tokens',
		}),
		{ method: 'POST' },
	);
	return await response.json();
};
