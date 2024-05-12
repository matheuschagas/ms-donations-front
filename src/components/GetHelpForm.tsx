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
import { Contact, DonationType, DonationTypeValues } from '@/models/donation';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
	types: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: 'Selecione pelo menos um item',
	}),
	whatsapp: z.string().refine((value) => value.length === 11, {
		message: 'O numero de telefone deve possuir 11 digitos.',
	}),
});

export function GetHelpForm({
	handleOnSubmit,
}: {
	handleOnSubmit: (data: { types: DonationType[]; contact: Contact }) => any;
}) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			types: [],
			whatsapp: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		await handleOnSubmit({
			types: data.types as DonationType[],
			contact: { whatsapp: '+55' + data.whatsapp },
		});
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
					{Object.keys(DonationType).map((item, index) => {
						return (
							<FormField
								key={item}
								control={form.control}
								name="types"
								render={({ field }) => {
									return (
										<FormItem
											key={item}
											className="flex flex-row items-start space-x-3 space-y-0"
										>
											<FormControl>
												<Checkbox
													checked={field.value?.includes(item)}
													onCheckedChange={(checked) => {
														return checked
															? field.onChange([...field.value, item])
															: field.onChange(
																	field.value?.filter(
																		(value) => value !== item,
																	),
																);
													}}
												/>
											</FormControl>
											<FormLabel className="font-normal">
												{DonationTypeValues[item as DonationType]}
											</FormLabel>
											<FormMessage />
										</FormItem>
									);
								}}
							/>
						);
					})}
					<FormField
						control={form.control}
						name="whatsapp"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										type="tel"
										maxLength={11}
										placeholder="Telefone para contato"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<DialogFooter className="sm:justify-start">
						<Button type="submit">Ajudar</Button>
						<DialogClose asChild>
							<Button type="button" variant="secondary">
								Fechar
							</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</Form>
		</>
	);
}
