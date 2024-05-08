'use client';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDonations } from '@/queries/donations';
import { DonationType, DonationTypeValues } from '@/models/donation';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
const formSchema = z.object({
	lat: z.string().min(2).max(50),
	long: z.string().min(2).max(50),
});

const Page = () => {
	const [locationFeature, setLocationFeature] = useState(true);
	const [locationGranted, setLocationGranted] = useState(false);
	const [location, setLocation] = useState<GeolocationPosition | undefined>();
	const [donationType, setDonationType] = useState<DonationType | undefined>();
	const [wannaHelpModalVisible, setWannaHelpModalVisible] = useState(false);
	const MapComponentWithNoSSR = dynamic(() => import('../components/Map'), {
		ssr: false, // This will only render on the client-side
	});

	const { data } = useQuery({
		queryKey: ['donations', location, donationType],
		queryFn: fetchDonations,
	});

	useEffect(() => {
		if (navigator.geolocation) {
			setLocationGranted(true);
			navigator.geolocation.getCurrentPosition(handlePosition, handlePositionError);
		} else {
			setLocationFeature(false);
		}
	}, []);

	useEffect(() => {
		console.log(data);
	}, [data]);

	const handlePositionError = () => {
		setLocationGranted(false);
	};

	const handlePosition = (position: GeolocationPosition) => {
		setLocation(position);
	};
	const handleGetHelp = () => {
		if (locationFeature && locationGranted) {
		} else {
		}
	};
	const handleHelp = () => {
		setWannaHelpModalVisible(true);
	};
	return (
		<>
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
			<AlertDialog open={wannaHelpModalVisible}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Como você pode ajudar?</AlertDialogTitle>
						<AlertDialogDescription>
							<Select>
								<SelectTrigger className="w-full max-w-xl">
									<SelectValue placeholder="Doação" />
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
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Sair</AlertDialogCancel>
						<AlertDialogAction>Continuar</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default Page;
