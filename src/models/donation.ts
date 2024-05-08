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
export interface Donation {
	lat: string;
	long: string;
	type: DonationType;
}
