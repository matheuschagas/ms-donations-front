'use client';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { useMap } from 'react-leaflet/hooks';
import { Marker, Popup } from 'react-leaflet';
const formSchema = z.object({
	lat: z.string().min(2).max(50),
	long: z.string().min(2).max(50),
});

const Page = () => {
	const [locationFeature, setLocationFeature] = useState(true);
	const [locationGranted, setLocationGranted] = useState(false);
	const [location, setLocation] = useState();

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
		console.log(position);
	};
	const handleGetHelp = () => {
		//get location
	};
	const handleHelp = () => {};
	return (
		<section className="flex h-[calc(100vh-52px)] w-full flex-col items-center">
			<MapContainer
				className={'z-0 w-full flex-1'}
				center={[-30.0347418, -51.1830504]}
				zoom={location ? 16 : 12}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{location ? (
					<Marker position={[-30.0347418, -51.1830504]}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				) : null}
			</MapContainer>
			<div className="fixed bottom-5 left-0 z-10 flex w-full items-center justify-center gap-x-4 p-4">
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
