import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker, Popup } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';

interface MapProps {
	location: GeolocationPosition | undefined;
}
const Map = ({ location }: MapProps) => {
	return (
		<MapContainer
			className={'z-0 w-full flex-1'}
			center={
				location
					? [location.coords.latitude, location.coords.longitude]
					: [-30.0347418, -51.1830504]
			}
			zoom={location ? 16 : 12}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{location ? (
				<Marker position={[location.coords.latitude, location.coords.longitude]}>
					<Popup>Arraste para melhorar a precisão</Popup>
				</Marker>
			) : null}
		</MapContainer>
	);
};

export default Map;
