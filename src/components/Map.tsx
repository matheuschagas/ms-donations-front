import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker, Popup } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';

interface MapProps {
	location:
		| {
				lat: string;
				long: string;
		  }
		| undefined;
}
const Map = ({ location }: MapProps) => {
	return (
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
	);
};

export default Map;
