import { Donation, DonationType } from '@/models/donation';
import { urlBuilder } from '@/lib/urlBuilder';

interface fetchDonationParams {
	queryKey: [
		string,
		GeolocationPosition | undefined,
		DonationType | undefined,
		string | undefined,
	];
}
export const fetchDonations = async ({
	queryKey,
}: fetchDonationParams): Promise<Donation[] | null> => {
	const [_, location, donationType, token] = queryKey;
	if (!location || !donationType || !token) return null;
	const response = await fetch(
		urlBuilder({
			path: `donations?lat=${location.coords.latitude}&long=${location.coords.longitude}&type=${donationType}`,
			subdomain: 'donations',
		}),
		{ method: 'GET', headers: { Authorization: `Bearer ${token}` } },
	);
	return await response.json();
};

export const addDonation = (): Promise<Donation> =>
	fetch(urlBuilder({ path: 'donations', subdomain: 'donations' }), { method: 'POST' }).then(
		async (response) => await response.json(),
	);
