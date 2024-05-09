import { DonationType, DonationTypeValues } from '@/models/donation';
import { useState } from 'react';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SuggestionForm } from '@/components/SuggestionForm';

export enum ViewMode {
	MAP,
	LIST,
}
interface HeaderProps {
	location: GeolocationPosition | undefined;
	donationType: DonationType | undefined;
	donationsLength: number | undefined;
	mode?: ViewMode;
}
export const Header = ({ location, donationType, donationsLength }: HeaderProps) => {
	const [suggestionModalVisible, setSuggestionModalVisible] = useState(false);
	const handleSuggestion = () => {};
	return (
		<header className="flex w-full items-center justify-between bg-gray-800 p-4 text-white">
			{!location && <h1 className="text-sm">Autorize o uso da localização</h1>}
			{location && !donationType && <h1 className="text-sm">MS Donations</h1>}
			{location && donationType && (
				<h1 className="text-sm">
					{DonationTypeValues[donationType]} ({donationsLength})
				</h1>
			)}
			<Dialog>
				<DialogTrigger asChild>
					<h2 className="cursor-pointer text-sm">Faça uma sugestão</h2>
				</DialogTrigger>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Sugestões</DialogTitle>
						<DialogDescription>Compartilhe suas ideias conosco.</DialogDescription>
					</DialogHeader>
					<SuggestionForm />
					<DialogFooter className="sm:justify-start">
						<DialogClose asChild>
							<Button type="button" variant="secondary">
								Fechar
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</header>
	);
};
