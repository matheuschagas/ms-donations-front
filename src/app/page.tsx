'use client';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDonations } from '@/queries/donations';
import { DonationType, DonationTypeValues } from '@/models/donation';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Header } from '@/components/Header';
const MapComponentWithNoSSR = dynamic(() => import('../components/Map'), {
	ssr: false, // This will only render on the client-side
});
const Page = () => {
	const [locationFeature, setLocationFeature] = useState(true);
	const [location, setLocation] = useState<GeolocationPosition | undefined>();
	const [donationType, setDonationType] = useState<DonationType | undefined>();
	const [wannaHelpModalVisible, setWannaHelpModalVisible] = useState(false);
	const [getHelpModalVisible, setGetHelpModalVisible] = useState(false);

	const { data } = useQuery({
		queryKey: ['donations', location, donationType],
		queryFn: fetchDonations,
	});

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(handlePosition, handlePositionError);
		} else {
			setLocationFeature(false);
		}
	}, []);

	useEffect(() => {
		console.log(data);
	}, [data]);

	const handlePositionError = () => {};

	const handlePosition = (position: GeolocationPosition) => {
		setLocation(position);
	};
	const handleGetHelp = () => {
		if (locationFeature) {
		} else {
		}
	};
	const handleHelp = () => {
		setWannaHelpModalVisible(true);
	};

	const handleOnDonationType = (donationType: string) => {
		setDonationType(donationType as DonationType);
		setWannaHelpModalVisible(false);
	};
	return (
		<>
			<Header
				location={location}
				donationType={donationType}
				donationsLength={data?.length}
			/>
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
							<Select onValueChange={handleOnDonationType}>
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
						<AlertDialogCancel
							onClick={() => {
								setWannaHelpModalVisible(false);
							}}
						>
							Sair
						</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default Page;
