import { DonationType, DonationTypeValues } from '@/models/donation';

interface HeaderProps {
	location: GeolocationPosition | undefined;
	donationType: DonationType | undefined;
	donationsLength: number | undefined;
}
export const Header = ({ location, donationType, donationsLength }: HeaderProps) => {
	return (
		<header className="flex w-full items-center justify-center bg-gray-800 p-4 text-white">
			{!location && <h1 className="text-sm">Autorize o uso da localização</h1>}
			{location && !donationType && <h1 className="text-sm">Bem-vindo</h1>}
			{location && donationType && (
				<h1 className="text-sm">
					{DonationTypeValues[donationType]} ({donationsLength})
				</h1>
			)}
		</header>
	);
};
