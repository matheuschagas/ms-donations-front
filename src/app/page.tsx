'use client';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useEffect, useState } from 'react';
const formSchema = z.object({
	lat: z.string().min(2).max(50),
	long: z.string().min(2).max(50),
});

const MapComponentWithNoSSR = dynamic(() => import('../components/Map'), {
	ssr: false, // This will only render on the client-side
});

const Page = () => {
	const [locationFeature, setLocationFeature] = useState(true);
	const [locationGranted, setLocationGranted] = useState(false);
	const [location, setLocation] = useState<GeolocationPosition | undefined>();

	useEffect(() => {
		if (navigator.geolocation) {
			setLocationGranted(true);
			navigator.geolocation.getCurrentPosition(handlePosition, handlePositionError);
		} else {
			setLocationFeature(false);
		}
	}, []);

	const handlePositionError = () => {
		setLocationGranted(false);
	};

	const handlePosition = (position: GeolocationPosition) => {
		setLocation(position);
	};
	const handleGetHelp = () => {
		//get location
	};
	const handleHelp = () => {};
	return (
		<section className="flex h-[calc(100vh-52px)] w-full flex-col items-center justify-center">
			<MapComponentWithNoSSR location={location} />
			<div className="fixed bottom-5 left-0 z-10 flex w-full flex-col items-center justify-center gap-4 p-4 sm:flex-row">
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
