import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';

const FormSchema = z.object({
	description: z.string().min(3, {
		message: 'Descrição precisa ser maior que 3 caracteres.',
	}),
});

interface SuggestionFormProps {
	handleSuggestion: (data: string) => any;
}

export function SuggestionForm({ handleSuggestion }: SuggestionFormProps) {
	const { toast } = useToast();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			description: '',
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		handleSuggestion(data.description);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<DialogFooter className="sm:justify-start">
					<Button type="submit">Enviar</Button>
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Fechar
						</Button>
					</DialogClose>
				</DialogFooter>
			</form>
		</Form>
	);
}
