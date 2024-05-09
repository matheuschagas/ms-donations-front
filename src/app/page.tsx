'use client';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDonations } from '@/queries/donations';
import { DonationType } from '@/models/donation';
import { Header } from '@/components/Header';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { HelpForm } from '@/components/HelpForm';
import { useToken } from '@/hooks/useToken';
const MapComponentWithNoSSR = dynamic(() => import('../components/Map'), {
	ssr: false, // This will only render on the client-side
});
const Page = () => {
	const { token, loading } = useToken();
	const [locationFeature, setLocationFeature] = useState(true);
	const [location, setLocation] = useState<GeolocationPosition | undefined>();
	const [donationType, setDonationType] = useState<DonationType | undefined>();
	const [wannaHelpModalVisible, setWannaHelpModalVisible] = useState(false);
	const [getHelpModalVisible, setGetHelpModalVisible] = useState(false);

	const { data } = useQuery({
		queryKey: ['donations', location, donationType, token],
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
				<MapComponentWithNoSSR donations={data} location={location} />
				<div className="fixed bottom-5 left-0 z-10 flex w-full flex-col items-center justify-center gap-4 p-4 sm:flex-row">
					<Button onClick={handleHelp} size="lg">
						Quero ajudar
					</Button>
					<Button onClick={handleGetHelp} size="lg">
						Preciso de ajuda
					</Button>
				</div>
			</section>
			<Dialog open={wannaHelpModalVisible} onOpenChange={setWannaHelpModalVisible}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Sugestões</DialogTitle>
						<DialogDescription>Compartilhe suas ideias conosco.</DialogDescription>
					</DialogHeader>
					<HelpForm handleOnSubmit={handleOnDonationType} />
				</DialogContent>
			</Dialog>
		</>
	);
};

export default Page;
