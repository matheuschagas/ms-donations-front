export enum DonationType {
	FOOD = 'FOOD',
	WATER = 'WATER',
	CLOTHES = 'CLOTHES',
}

export const DonationTypeValues = {
	[DonationType.CLOTHES]: 'Roupas',
	[DonationType.FOOD]: 'Comida',
	[DonationType.WATER]: 'Água',
};

interface Contact {
	whatsapp: string;
}
export interface Donation {
	lat: string;
	long: string;
	contact: Contact;
	_id: string;
	types: DonationType[];
}
