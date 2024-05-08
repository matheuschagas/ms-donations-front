import { Donation } from '@/models/donation';
import { urlBuilder } from '@/lib/urlBuilder';

export const fetchDonations = (): Promise<Donation[]> =>
	fetch(urlBuilder({ path: '/donations' })).then(async (response) => await response.json());

export const addDonation = (): Promise<Donation> =>
	fetch(urlBuilder({ path: '/donations' }), { method: 'POST' }).then(
		async (response) => await response.json(),
	);
