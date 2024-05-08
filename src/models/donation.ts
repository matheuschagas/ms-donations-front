export enum DonationType {
	FOOD = 'FOOD',
	WATER = 'WATER',
	CLOTHES = 'CLOTHES',
}
export interface Donation {
	lat: string;
	long: string;
	type: DonationType;
}
