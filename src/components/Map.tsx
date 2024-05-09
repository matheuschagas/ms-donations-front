import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker, Popup } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { Donation, DonationTypeValues } from '@/models/donation';

interface MapProps {
	location: GeolocationPosition | undefined;
	donations: Donation[] | null | undefined;
}
const Map = ({ location, donations }: MapProps) => {
	return (
		<MapContainer
			className={'z-0 w-full flex-1'}
			center={
				location
					? [location.coords.latitude, location.coords.longitude]
					: [-30.0347418, -51.1830504]
			}
			zoom={12}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{location ? (
				<Marker position={[location.coords.latitude, location.coords.longitude]}>
					<Popup>Você está aqui</Popup>
				</Marker>
			) : null}
			{donations?.map((donation, index) => (
				<Marker
					key={index}
					position={[parseFloat(donation.lat), parseFloat(donation.long)]}
				>
					<Popup>
						{donation.types?.map((donation) => DonationTypeValues[donation]).join(', ')}
						<br />
						<a href={`https://wa.me/${donation.contact?.whatsapp}`} target="_blank">
							{donation.contact?.whatsapp}
						</a>
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
};

export default Map;
