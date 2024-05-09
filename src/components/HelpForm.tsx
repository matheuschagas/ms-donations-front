'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { DonationType, DonationTypeValues } from '@/models/donation';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';

const FormSchema = z.object({
	type: z.enum(Object.values(DonationType) as unknown as readonly [string, ...string[]]),
});

export function HelpForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			type: '',
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data);
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger className="w-full max-w-xl">
											<SelectValue placeholder="Selecione como ajudar" />
										</SelectTrigger>
										<SelectContent>
											{Object.keys(DonationType).map((item, index) => {
												return (
													<SelectItem key={item} value={item}>
														{DonationTypeValues[item as DonationType]}
													</SelectItem>
												);
											})}
										</SelectContent>
									</Select>
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
