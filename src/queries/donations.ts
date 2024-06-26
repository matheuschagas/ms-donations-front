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

const coordsPrecision = 6;
export const fetchDonations = async ({
	queryKey,
}: fetchDonationParams): Promise<Donation[] | null> => {
	const [_, location, donationType, token] = queryKey;
	if (!location || !donationType || !token) return null;
	const response = await fetch(
		urlBuilder({
			path: `donations?lat=${location.coords.latitude.toFixed(coordsPrecision)}&long=${location.coords.longitude.toFixed(coordsPrecision)}&type=${donationType}`,
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
export const addDonation = async ({ queryKey }: addDonationParams): Promise<Donation> => {
	const [_, location, donationTypes, contact, token] = queryKey;
	if (!location || !donationTypes || !contact || !token) throw new Error('Missing data');
	const body = JSON.stringify({
		lat: parseFloat(location.coords.latitude.toFixed(coordsPrecision)),
		long: parseFloat(location.coords.longitude.toFixed(coordsPrecision)),
		types: donationTypes,
		contact,
	});
	const response = await fetch(urlBuilder({ path: 'donations', subdomain: 'donations' }), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body,
	});
	return await response.json();
};
