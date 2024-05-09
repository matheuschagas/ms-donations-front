import { Contact, Donation, DonationType } from '@/models/donation';
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

interface addDonationParams {
	queryKey: [
		string,
		GeolocationPosition | undefined,
		DonationType[] | undefined,
		Contact | undefined,
		string | undefined,
	];
}
export const addDonation = ({ queryKey }: addDonationParams): Promise<Donation> => {
	const [_, location, donationTypes, contact, token] = queryKey;
	return fetch(urlBuilder({ path: 'donations', subdomain: 'donations' }), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			lat: location?.coords.latitude,
			long: location?.coords.longitude,
			types: donationTypes,
			contact,
		}),
	}).then(async (response) => await response.json());
};
