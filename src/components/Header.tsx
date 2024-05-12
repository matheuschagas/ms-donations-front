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
import { toast } from '@/components/ui/use-toast';
import { addSuggestion } from '@/queries/suggestions';
import { Token } from '@/models/token';

export enum ViewMode {
	MAP,
	LIST,
}
interface HeaderProps {
	location: GeolocationPosition | undefined;
	donationType: DonationType | undefined;
	donationsLength: number | undefined;
	mode?: ViewMode;
	token: string | undefined;
}
export const Header = ({ location, donationType, donationsLength, token }: HeaderProps) => {
	const [suggestionModalVisible, setSuggestionModalVisible] = useState(false);
	const handleSuggestion = async (description: string) => {
		try {
			const suggestion = await addSuggestion({
				queryKey: ['suggestions', { description }, token],
			});
			if (!suggestion._id) throw new Error('Something went wrong.');
			toast({
				title: 'Obrigado!',
				description: <span>Sua sugestão será avaliada pelo nosso time.</span>,
			});
		} catch (error) {
			toast({
				title: 'Erro',
				description: <span>Não foi possível enviar sua sugestão.</span>,
			});
		}
	};
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
					<SuggestionForm handleSuggestion={handleSuggestion} />
				</DialogContent>
			</Dialog>
		</header>
	);
};
