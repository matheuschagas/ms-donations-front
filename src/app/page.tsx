'use client';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useState } from 'react';
const formSchema = z.object({
	lat: z.string().min(2).max(50),
	long: z.string().min(2).max(50),
});

const Page = () => {
	const [locationGranted, setLocationGranted] = useState(false);
	const handleGetHelp = () => {};
	const handleHelp = () => {};
	return (
		<section className="flex h-[calc(100vh-52px)] w-full flex-col items-center">
			<iframe
				className="w-full flex-1"
				src="https://www.openstreetmap.org/export/embed.html"
			/>
			<div className="fixed bottom-5 left-0 flex w-full items-center justify-center gap-x-4 p-4">
				<Button onClick={handleHelp} size="lg">
					Quero ajudar
				</Button>
				<Button onClick={handleGetHelp} size="lg">
					Preciso de ajuda
				</Button>
			</div>
		</section>
	);
};

export default Page;
